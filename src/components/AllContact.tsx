/** @jsxImportSource @emotion/react */
import { listContactStyle, typography } from "../style/js/emotion";
import CardContact from "./CardContact";
import { ReactElement } from "react";
import { AllContactType, FavoriteState } from "../services/interfaces";
import { ascSort } from "../services/helpers";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../services/favoriteSlice";

const AllContact = (props: {
  contact: AllContactType[];
  currentPage: number;
  filteredData: string;
}) => {
  const { contact } = props;
  const allContact: Array<ReactElement> = [];
  const contactOrFav = useSelector(
    (state: { favorite: FavoriteState }) => state.favorite.contactOrFav
  );
  const dispatch = useDispatch();

  contact &&
    contact
      .sort((a: { first_name: string }, b: { first_name: string }) =>
        ascSort(a.first_name, b.first_name)
      )
      .slice(props.currentPage * 10, props.currentPage * 10 + 10)
      .filter((data: AllContactType) => {
        if (props.filteredData.length) {
          const name = data.first_name + " " + data.last_name;
          return (
            name.toLowerCase().includes(props.filteredData.toLowerCase()) ||
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
          {contactOrFav ? (
            <a href="/form" css={typography}>
              Add new contact
            </a>
          ) : (
            <span css={typography} onClick={() => dispatch(toggle(true))}>
              Add new contact
            </span>
          )}
        </span>
      )}
    </div>
  );
};

export default AllContact;
