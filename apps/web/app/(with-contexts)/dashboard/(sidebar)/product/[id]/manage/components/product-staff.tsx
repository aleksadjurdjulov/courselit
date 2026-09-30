"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@courselit/components-library";
import { User } from "@courselit/common-models";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    APP_MESSAGE_COURSE_SAVED,
    BUTTON_SAVE,
    BUTTON_SAVING,
    PRODUCT_LECTURER_HEADER,
    PRODUCT_MODERATOR_HEADER,
    PRODUCT_PERSON_ADD,
    PRODUCT_PERSON_NO_RESULTS,
    PRODUCT_PERSON_REMOVE,
    PRODUCT_PERSON_SEARCH_LABEL,
    PRODUCT_PERSON_SEARCH_PLACEHOLDER,
    PRODUCT_STAFF_SECTION_DESCRIPTION,
    PRODUCT_STAFF_SECTION_HEADER,
    TOAST_TITLE_ERROR,
    TOAST_TITLE_SUCCESS,
} from "@ui-config/strings";
import { useGraphQLFetch } from "@/hooks/use-graphql-fetch";
import { Loader2, Save, X } from "lucide-react";

const MUTATION_UPDATE_STAFF = `
    mutation UpdateCourseStaff(
        $courseId: String!
        $lecturerId: String
        $moderatorId: String
    ) {
        updateCourse(courseData: {
            id: $courseId
            lecturerId: $lecturerId
            moderatorId: $moderatorId
        }) {
            courseId
            lecturerId
            moderatorId
            lecturer {
                userId
                name
                email
                avatar {
                    file
                    thumbnail
                }
            }
            moderator {
                userId
                name
                email
                avatar {
                    file
                    thumbnail
                }
            }
        }
    }
`;

const QUERY_SEARCH_USERS = `
    query SearchUsers($page: Int, $filters: String) {
        users: getUsers(filters: $filters, page: $page) {
            userId
            name
            email
            avatar {
                file
                thumbnail
            }
        }
    }
`;

type StaffUser = Pick<User, "userId" | "name" | "email" | "avatar">;

type PersonFormState = {
    enabled: boolean;
    user: StaffUser | null;
};

interface ProductStaffProps {
    product: any;
}

function toPersonFormState(user?: StaffUser | null): PersonFormState {
    if (!user?.userId) {
        return { enabled: false, user: null };
    }
    return { enabled: true, user };
}

function toUserId(person: PersonFormState): string | null {
    if (!person.enabled || !person.user?.userId) {
        return null;
    }
    return person.user.userId;
}

export default function ProductStaff({ product }: ProductStaffProps) {
    const { toast } = useToast();
    const fetch = useGraphQLFetch();
    const [loading, setLoading] = useState(false);
    const [lecturer, setLecturer] = useState<PersonFormState>(
        toPersonFormState(product?.lecturer),
    );
    const [moderator, setModerator] = useState<PersonFormState>(
        toPersonFormState(product?.moderator),
    );
    const formDataRef = useRef({ lecturer, moderator });
    const savedRef = useRef({
        lecturerId: toUserId(toPersonFormState(product?.lecturer)),
        moderatorId: toUserId(toPersonFormState(product?.moderator)),
    });

    useEffect(() => {
        const nextLecturer = toPersonFormState(product?.lecturer);
        const nextModerator = toPersonFormState(product?.moderator);
        setLecturer(nextLecturer);
        setModerator(nextModerator);
        formDataRef.current = {
            lecturer: nextLecturer,
            moderator: nextModerator,
        };
        savedRef.current = {
            lecturerId: toUserId(nextLecturer),
            moderatorId: toUserId(nextModerator),
        };
    }, [product]);

    const updateLecturer = (next: PersonFormState) => {
        setLecturer(next);
        formDataRef.current = { ...formDataRef.current, lecturer: next };
    };

    const updateModerator = (next: PersonFormState) => {
        setModerator(next);
        formDataRef.current = { ...formDataRef.current, moderator: next };
    };

    const isDirty =
        toUserId(lecturer) !== savedRef.current.lecturerId ||
        toUserId(moderator) !== savedRef.current.moderatorId;

    const canSubmit =
        isDirty &&
        (!lecturer.enabled || Boolean(lecturer.user?.userId)) &&
        (!moderator.enabled || Boolean(moderator.user?.userId));

    const searchUsers = useCallback(
        async (query: string): Promise<StaffUser[]> => {
            const filters = JSON.stringify({
                aggregator: "or",
                filters: [
                    {
                        name: "email",
                        condition: "Contains",
                        value: query,
                    },
                ],
            });
            const response = await fetch
                .setPayload({
                    query: QUERY_SEARCH_USERS,
                    variables: { page: 1, filters },
                })
                .build()
                .exec();
            return response?.users || [];
        },
        [fetch],
    );

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!product?.courseId || !canSubmit) return;

        try {
            setLoading(true);
            const response = await fetch
                .setPayload({
                    query: MUTATION_UPDATE_STAFF,
                    variables: {
                        courseId: product.courseId,
                        lecturerId: toUserId(formDataRef.current.lecturer),
                        moderatorId: toUserId(formDataRef.current.moderator),
                    },
                })
                .build()
                .exec();

            if (response?.updateCourse) {
                const nextLecturer = toPersonFormState(
                    response.updateCourse.lecturer,
                );
                const nextModerator = toPersonFormState(
                    response.updateCourse.moderator,
                );
                setLecturer(nextLecturer);
                setModerator(nextModerator);
                formDataRef.current = {
                    lecturer: nextLecturer,
                    moderator: nextModerator,
                };
                savedRef.current = {
                    lecturerId: toUserId(nextLecturer),
                    moderatorId: toUserId(nextModerator),
                };
                toast({
                    title: TOAST_TITLE_SUCCESS,
                    description: APP_MESSAGE_COURSE_SAVED,
                });
            }
        } catch (err: any) {
            toast({
                title: TOAST_TITLE_ERROR,
                description: err.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                    <h2 className="text-base font-semibold">
                        {PRODUCT_STAFF_SECTION_HEADER}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        {PRODUCT_STAFF_SECTION_DESCRIPTION}
                    </p>
                </div>

                <PersonEditor
                    title={PRODUCT_LECTURER_HEADER}
                    person={lecturer}
                    disabled={loading}
                    excludeUserId={moderator.user?.userId}
                    onChange={updateLecturer}
                    onSearch={searchUsers}
                    onError={(message) =>
                        toast({
                            title: TOAST_TITLE_ERROR,
                            description: message,
                            variant: "destructive",
                        })
                    }
                />

                <PersonEditor
                    title={PRODUCT_MODERATOR_HEADER}
                    person={moderator}
                    disabled={loading}
                    excludeUserId={lecturer.user?.userId}
                    onChange={updateModerator}
                    onSearch={searchUsers}
                    onError={(message) =>
                        toast({
                            title: TOAST_TITLE_ERROR,
                            description: message,
                            variant: "destructive",
                        })
                    }
                />

                <Button type="submit" disabled={loading || !canSubmit}>
                    {loading ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                        <Save className="h-4 w-4 mr-2" />
                    )}
                    {loading ? BUTTON_SAVING : BUTTON_SAVE}
                </Button>
            </form>
            <Separator />
        </div>
    );
}

function PersonEditor({
    title,
    person,
    disabled,
    excludeUserId,
    onChange,
    onSearch,
    onError,
}: {
    title: string;
    person: PersonFormState;
    disabled: boolean;
    excludeUserId?: string;
    onChange: (person: PersonFormState) => void;
    onSearch: (query: string) => Promise<StaffUser[]>;
    onError: (message: string) => void;
}) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<StaffUser[]>([]);
    const [searching, setSearching] = useState(false);
    const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, []);

    const runSearch = (value: string) => {
        setQuery(value);
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
        if (!value.trim()) {
            setResults([]);
            setSearching(false);
            return;
        }
        setSearching(true);
        searchTimeoutRef.current = setTimeout(async () => {
            try {
                const users = await onSearch(value.trim());
                setResults(
                    users.filter((user) => user.userId !== excludeUserId),
                );
            } catch (err: any) {
                setResults([]);
                onError(err.message);
            } finally {
                setSearching(false);
            }
        }, 300);
    };

    if (!person.enabled) {
        return (
            <div className="space-y-4 rounded-lg border p-4">
                <div className="flex items-center justify-between gap-4">
                    <h3 className="text-sm font-semibold">{title}</h3>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={disabled}
                        onClick={() => onChange({ enabled: true, user: null })}
                    >
                        {PRODUCT_PERSON_ADD}
                    </Button>
                </div>
            </div>
        );
    }

    if (person.user) {
        return (
            <div className="space-y-4 rounded-lg border p-4">
                <div className="flex items-center justify-between gap-4">
                    <h3 className="text-sm font-semibold">{title}</h3>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        disabled={disabled}
                        onClick={() => {
                            setQuery("");
                            setResults([]);
                            onChange({ enabled: false, user: null });
                        }}
                    >
                        <X className="h-4 w-4 mr-1" />
                        {PRODUCT_PERSON_REMOVE}
                    </Button>
                </div>
                <SelectedUser user={person.user} />
            </div>
        );
    }

    return (
        <div className="space-y-4 rounded-lg border p-4">
            <div className="flex items-center justify-between gap-4">
                <h3 className="text-sm font-semibold">{title}</h3>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={disabled}
                    onClick={() => {
                        setQuery("");
                        setResults([]);
                        onChange({ enabled: false, user: null });
                    }}
                >
                    <X className="h-4 w-4 mr-1" />
                    {PRODUCT_PERSON_REMOVE}
                </Button>
            </div>
            <div className="space-y-2">
                <Label htmlFor={`person-search-${title}`}>
                    {PRODUCT_PERSON_SEARCH_LABEL}
                </Label>
                <Input
                    id={`person-search-${title}`}
                    value={query}
                    disabled={disabled}
                    placeholder={PRODUCT_PERSON_SEARCH_PLACEHOLDER}
                    onChange={(e) => runSearch(e.target.value)}
                />
            </div>
            {searching && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                </div>
            )}
            {!searching && query.trim() && results.length === 0 && (
                <p className="text-sm text-muted-foreground">
                    {PRODUCT_PERSON_NO_RESULTS}
                </p>
            )}
            {results.length > 0 && (
                <div className="space-y-1 rounded-md border">
                    {results.map((user) => (
                        <button
                            key={user.userId}
                            type="button"
                            disabled={disabled}
                            className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-muted"
                            onClick={() => {
                                setQuery("");
                                setResults([]);
                                onChange({ enabled: true, user });
                            }}
                        >
                            <SelectedUser user={user} />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

function SelectedUser({ user }: { user: StaffUser }) {
    const label = user.name || user.email;
    return (
        <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
                <AvatarImage
                    src={
                        user.avatar?.file ||
                        user.avatar?.thumbnail ||
                        "/courselit_backdrop_square.webp"
                    }
                />
                <AvatarFallback>{label.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
                <div className="text-sm font-medium">{label}</div>
                {user.name && (
                    <div className="text-xs text-muted-foreground">
                        {user.email}
                    </div>
                )}
            </div>
        </div>
    );
}
