/** @jsxImportSource @emotion/react */
import AllContact from "./AllContact";
import { useLazyQuery } from "@apollo/client";
import { ReactElement, useEffect, useState } from "react";
import {
  contactAddStyle,
  contactFavItemStyle,
  contactFavStyle,
  contactStyle,
  contactSubtitleStyle,
  contactTitleStyle,
  errorStyle,
  loadingDiv,
  loadingStyle,
  pagination,
  searchContactStyle,
  shortcutContactStyle,
} from "../style/js/emotion";
import { GET_CONTACT } from "../services/queries";
import { AllContactType } from "../services/interfaces";
import {
  ascSort,
  checkDeletedFavorite,
  removeArray,
} from "../services/helpers";
import { useSelector } from "react-redux";

const BaseContact = () => {
  const [getContact, { loading, error }] = useLazyQuery(GET_CONTACT);
  const [allContact, setAllContact] = useState<AllContactType[]>([]);
  const [favoriteItem, setFavoriteItem] = useState<AllContactType[]>([]);
  const [minusFlag, setMinusFlag] = useState(false);
  const [plusFlag, setPlusFlag] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [contactOrFav, setContactOrFav] = useState(true);
  const [filteredData, setFilteredData] = useState("");
  const favorite = useSelector((state: any) => state.favorite.item);

  /**useEffect callbacks */
  // Fetch all things for the first time
  useEffect(() => {
    getContact().then(({ data }) => {
      // If favorite is not null and refreshed, it will filtered
      if (favorite?.length > 0) {
        const myArrayFiltered = removeArray(data.contact, favorite);
        setAllContact([...myArrayFiltered]);

        // If favorite has deleted and also need to delete from session
        const favoriteFiltered = checkDeletedFavorite(data);
        setFavoriteItem([...favoriteFiltered]);
      } else {
        setAllContact([...allContact, ...data.contact]);
      }
    });

    // Get favorite from session storage
    if (sessionStorage.getItem("favorite")) {
      const objFav: Array<AllContactType> = JSON.parse(
        sessionStorage.getItem("favorite") || "{}"
      );
      setFavoriteItem([...favoriteItem, ...objFav]);
    }
  }, []);

  useEffect(() => {
    // Remove contact array after favorite
    const myArrayFiltered = removeArray(allContact, favoriteItem);
    setAllContact([...myArrayFiltered]);

    // Disable state for styling arrow pagination
    setPlusFlag((prev) => (prev = true));
    setMinusFlag((prev) => (prev = true));

    if (currentPage === 0) {
      setMinusFlag((prev) => (prev = false));
    }

    if (contactOrFav) {
      if (allContact && allContact.length < 10) {
        setMinusFlag((prev) => (prev = false));
        setPlusFlag((prev) => (prev = false));
      }
    } else {
      if (favoriteItem && favoriteItem.length < 10) {
        setMinusFlag((prev) => (prev = false));
        setPlusFlag((prev) => (prev = false));
      }
    }

    if (contactOrFav) {
      if (allContact && (currentPage + 1) * 10 >= allContact.length) {
        setPlusFlag((prev) => (prev = false));
      }
    } else {
      if (favoriteItem && (currentPage + 1) * 10 >= favoriteItem.length) {
        setPlusFlag((prev) => (prev = false));
      }
    }
  }, [currentPage, favoriteItem]);

  // Add favorite will change erase data from all contact
  useEffect(() => {
    if (sessionStorage.getItem("favorite") && favorite.length > 0) {
      setFavoriteItem([...favorite]);
      const myArrayFiltered = removeArray(allContact, favoriteItem);
      setAllContact([...myArrayFiltered]);
    }
  }, [favorite]);

  /**Pagination */
  const setPagination = (check: string, value: AllContactType[]) => {
    if (value && value.length < 10) {
      return;
    }

    // This is prevent pagination go to the empty next page
    if (check === "plus" && value && (currentPage + 1) * 10 >= value.length) {
      return;
    } else if (check === "plus") {
      setCurrentPage(currentPage + 1);
    }

    // This is prevent pagination go to the empty previous page or page with -1 index
    if (check === "minus" && currentPage === 0) {
      return;
    } else if (check === "minus") {
      setCurrentPage(currentPage - 1);
    }
  };

  const favItem: Array<ReactElement> = [];
  favoriteItem
    .sort((a: { first_name: string }, b: { first_name: string }) =>
      ascSort(a.first_name, b.first_name)
    )
    .slice(0, 4)
    .map((data: AllContactType) =>
      favItem.push(
        <div key={data.id} css={contactFavItemStyle}>
          <i className="fa fa-user-o">
            <i className="fa fa-heart"></i>
          </i>
          <span>{data.first_name}</span>
        </div>
      )
    );

  return (
    <div css={[contactStyle, loading && loadingDiv]}>
      <div css={loading && loadingStyle} className="loading"></div>
      <div css={error ? errorStyle : { display: "none" }} className="error">
        {error?.message}
      </div>
      <h1 css={contactTitleStyle}>Contacts</h1>
      <div css={contactAddStyle}>
        <a href="/form">
          <span>+</span>
        </a>
      </div>
      <div css={searchContactStyle}>
        <input
          onChange={(e) => setFilteredData(e.currentTarget.value)}
          type="text"
          placeholder="Search by name or phone"
        />
        <i className="fa fa-search"></i>
      </div>
      <h2 css={contactSubtitleStyle}>Recent Favorites</h2>
      <div css={contactFavStyle}>
        {favItem.length ? (
          favItem
        ) : (
          <p css={{ margin: 0, width: "200%", fontSize: 14, fontWeight: 500 }}>
            No contact
          </p>
        )}
      </div>
      <div css={shortcutContactStyle}>
        <span
          onClick={() => setContactOrFav((prev) => (prev = true))}
          className={`${contactOrFav ? "active" : ""}`}
        >
          All Contacts
        </span>
        <span
          className={`${contactOrFav ? "" : "active"}`}
          onClick={() => setContactOrFav((prev) => (prev = false))}
        >
          Favorites
        </span>
      </div>
      <AllContact
        contact={contactOrFav ? allContact : favoriteItem}
        currentPage={currentPage}
        favorite={!contactOrFav}
        filteredData={filteredData}
        setContactOrFav={setContactOrFav}
      ></AllContact>
      <div css={pagination} className="pagination">
        <i
          onClick={() =>
            setPagination("minus", contactOrFav ? allContact : favoriteItem)
          }
          className={`fa fa-chevron-left ${minusFlag ? "" : "disabled"}`}
        ></i>
        <p>{currentPage + 1}</p>
        <i
          onClick={() =>
            setPagination("plus", contactOrFav ? allContact : favoriteItem)
          }
          className={`fa fa-chevron-right ${plusFlag ? "" : "disabled"}`}
        ></i>
      </div>
    </div>
  );
};

export default BaseContact;
