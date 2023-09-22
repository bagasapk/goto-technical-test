/** @jsxImportSource @emotion/react */
import { listContactStyle, typography } from "../style/js/emotion";
import CardContact from "./CardContact";
import { ReactElement } from "react";
import { AllContactType } from "../services/interfaces";
import { ascSort } from "../services/helpers";

const AllContact = (props: {
  contact: AllContactType[];
  currentPage: number;
  filteredData: string;
}) => {
  const { contact } = props;
  const allContact: Array<ReactElement> = [];

  contact &&
    contact
      .sort((a: { first_name: string }, b: { first_name: string }) =>
        ascSort(a.first_name, b.first_name)
      )
      .slice(props.currentPage * 10, props.currentPage * 10 + 10)
      .filter((data: AllContactType) => {
        if (props.filteredData.length) {
          return (
            data.first_name
              .toLowerCase()
              .includes(props.filteredData.toLowerCase()) ||
            data.phones[0].number.includes(props.filteredData)
          );
        } else return data;
      })
      .map((data: AllContactType) =>
        allContact.push(<CardContact key={data.id} data={data} />)
      );

  return (
    <div css={listContactStyle}>
      {allContact.length ? (
        allContact
      ) : (
        <span
          css={{
            paddingInline: "1.75rem",
            fontSize: 14,
            fontWeight: 500,
            textAlign: "start",
          }}
        >
          No contact...{" "}
          <a href="/form" css={typography}>
            Add new contact
          </a>
        </span>
      )}
    </div>
  );
};

export default AllContact;
