import { render, screen, fireEvent } from "@testing-library/react";
import { PaginationControls } from "../pagination";
import {
    PAGINATION_PREVIOUS,
    PAGINATION_NEXT,
    PAGINATION_OF,
} from "@ui-config/strings";

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
    ChevronLeft: () => <span>ChevronLeft</span>,
    ChevronRight: () => <span>ChevronRight</span>,
    MoreHorizontal: () => <span>MoreHorizontal</span>,
}));

describe("PaginationControls", () => {
    const mockOnPageChange = jest.fn();

    beforeEach(() => {
        mockOnPageChange.mockClear();
    });

    it("renders current page and total pages correctly", () => {
        render(
            <PaginationControls
                currentPage={2}
                totalPages={5}
                onPageChange={mockOnPageChange}
            />,
        );

        expect(screen.getByText(`2 ${PAGINATION_OF} 5`)).toBeInTheDocument();
    });

    it("disables previous button on first page", () => {
        render(
            <PaginationControls
                currentPage={1}
                totalPages={5}
                onPageChange={mockOnPageChange}
            />,
        );

        const previousButton = screen
            .getByText(PAGINATION_PREVIOUS)
            .closest("a");
        expect(previousButton).toHaveClass("pointer-events-none", "opacity-50");
    });

    it("disables next button on last page", () => {
        render(
            <PaginationControls
                currentPage={5}
                totalPages={5}
                onPageChange={mockOnPageChange}
            />,
        );

        const nextButton = screen.getByText(PAGINATION_NEXT).closest("a");
        expect(nextButton).toHaveClass("pointer-events-none", "opacity-50");
    });

    it("calls onPageChange with previous page when previous button is clicked", () => {
        render(
            <PaginationControls
                currentPage={3}
                totalPages={5}
                onPageChange={mockOnPageChange}
            />,
        );

        const previousButton = screen
            .getByText(PAGINATION_PREVIOUS)
            .closest("a");
        fireEvent.click(previousButton!);
        expect(mockOnPageChange).toHaveBeenCalledWith(2);
    });

    it("calls onPageChange with next page when next button is clicked", () => {
        render(
            <PaginationControls
                currentPage={3}
                totalPages={5}
                onPageChange={mockOnPageChange}
            />,
        );

        const nextButton = screen.getByText(PAGINATION_NEXT).closest("a");
        fireEvent.click(nextButton!);
        expect(mockOnPageChange).toHaveBeenCalledWith(4);
    });

    it("disables both buttons when totalPages is 0", () => {
        render(
            <PaginationControls
                currentPage={1}
                totalPages={0}
                onPageChange={mockOnPageChange}
            />,
        );

        const previousButton = screen
            .getByText(PAGINATION_PREVIOUS)
            .closest("a");
        const nextButton = screen.getByText(PAGINATION_NEXT).closest("a");

        expect(previousButton).toHaveClass("pointer-events-none", "opacity-50");
        expect(nextButton).toHaveClass("pointer-events-none", "opacity-50");
    });

    it("does not call onPageChange when clicking disabled buttons", () => {
        render(
            <PaginationControls
                currentPage={1}
                totalPages={5}
                onPageChange={mockOnPageChange}
            />,
        );

        const previousButton = screen
            .getByText(PAGINATION_PREVIOUS)
            .closest("a");
        fireEvent.click(previousButton!);
        expect(mockOnPageChange).not.toHaveBeenCalled();
    });
});
