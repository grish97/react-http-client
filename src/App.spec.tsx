import {expect} from "vitest";
import {render, screen} from "@testing";
import App from "@/App.tsx";

describe("App", () => {
  it('should render correctly', () => {
    render(<App />);

    const divElement = screen.getByRole("headercontent");
    expect(divElement).toBeInTheDocument();
  });
});
