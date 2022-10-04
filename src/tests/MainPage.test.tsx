import {render, screen} from "@testing-library/react";
import MainPage from "../pages/Main";

jest.mock('react-i18next', () => ({
    // This mock makes sure any components using the translate-hook can be tested without a warning being shown
    useTranslation: () => {
        return {
            t: (str: string) => str,
            i18n: {
                changeLanguage: () => new Promise(() => {}),
            },
        };
    },
}));

test("if translation on main page is available", () => {
    render(<MainPage />);
    expect(screen.getByText("Main")).toBeInTheDocument();
    expect(screen.getAllByText("amountOfTasks").length).toBe(4);
});