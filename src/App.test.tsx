import { render, screen } from "@testing-library/react";
import CardContact from "./components/CardContact";
import { MockedProvider } from "@apollo/client/testing";
import { GET_CONTACT } from "./services/queries";
import { Provider } from "react-redux";
import store from "./services/store";

test("Render contacts name and number correctly", async () => {
  const contactMock = {
    request: {
      query: GET_CONTACT,
      variables: { name: "Buck" },
    },
    result: {
      data: {
        contact: {
          created_at: "2023-09-22T16:29:03.031102+00:00",
          first_name: "John",
          id: 1,
          last_name: "Doe",
          phones: [
            {
              number: "+628123",
            },
          ],
        },
      },
    },
  };

  render(
    <MockedProvider mocks={[contactMock]}>
      <Provider store={store}>
        <CardContact key="1" data={contactMock.result.data.contact} />
      </Provider>
    </MockedProvider>
  );
  const nameElement = screen.getByText(/John Doe/);
  const phoneElement = screen.getByText("+628123");
  expect(await nameElement).toBeInTheDocument();
  expect(await phoneElement).toBeInTheDocument();
});

describe("Pagination return correctly", () => {
  // Create similar function
  let currentPage = 0;
  const setPagination = (check: string, length: number) => {
    if (length < 10) {
      return;
    }

    // This is prevent pagination go to the empty next page
    if (check === "plus" && length && (currentPage + 1) * 10 >= length) {
      return;
    } else if (check === "plus") {
      return currentPage + 1;
    }

    // This is prevent pagination go to the empty previous page or page with -1 index
    if (check === "minus" && currentPage === 0) {
      return;
    } else if (check === "minus") {
      return currentPage - 1;
    }
  };

  test("Prevent to click if length of item < 10", () => {
    expect(setPagination("", 0)).toBe(undefined);
  });

  test("Prevent to page number 3 if maximum page is 20/10 = 2", () => {
    expect(setPagination("plus", 20)).not.toBe(3);
  });

  test("Prevent to -1 index page", () => {
    expect(setPagination("minus", 0)).not.toBe(-1);
  });

  //Test success
  test("Test success", () => {
    expect(setPagination("plus", 11)).toBe(1);
    currentPage = 1;
    expect(setPagination("minus", 11)).toBe(0);
  });
});

describe("add favorite and remove from contact", () => {
});
