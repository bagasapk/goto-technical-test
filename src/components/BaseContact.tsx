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
import { useDispatch, useSelector } from "react-redux";
import { change, toggle } from "../services/favoriteSlice";

const BaseContact = () => {
  const [getContact, { data, loading, error }] = useLazyQuery(GET_CONTACT);
  const [allContact, setAllContact] = useState<AllContactType[]>([]);
  const [favoriteItem, setFavoriteItem] = useState<AllContactType[]>([]);
  const [minusFlag, setMinusFlag] = useState(false);
  const [plusFlag, setPlusFlag] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredData, setFilteredData] = useState("");
  const favorite = useSelector((state: any) => state.favorite.item);
  const contactOrFav = useSelector((state: any) => state.favorite.contactOrFav);
  const dispatch = useDispatch();

  /**useEffect callbacks */
  // Fetch all things for the first time
  useEffect(() => {
    getContact().then(({ data }) => {
      // If favorite is not null and refreshed, it will filtered
      if (favorite?.length > 0) {
        const myArrayFiltered = removeArray(data.contact, favorite);
        setAllContact([...myArrayFiltered]);

        // If favorite has deleted and also need to delete from session
        const favoriteFiltered = checkDeletedFavorite(data.contact);
        setFavoriteItem([...favoriteFiltered]);

        if (contactOrFav && data && data.contact.length < 10) {
          setMinusFlag((prev) => (prev = false));
          setPlusFlag((prev) => (prev = false));
        }
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
    setMinusFlag((prev) => (prev = false));
    setPlusFlag((prev) => (prev = true));

    if (currentPage !== 0) {
      setPlusFlag((prev) => (prev = true));
      setMinusFlag((prev) => (prev = true));
    }

    getContact().then(({ data }) => {
      if (data) {
        if (data.contact.length < 0) {
          setPlusFlag((prev) => (prev = false));
          setMinusFlag((prev) => (prev = false));
        } else if (currentPage + 1 > data?.contact.length / 10) {
          setPlusFlag((prev) => (prev = false));
        }
      }
    });
  }, [currentPage, favoriteItem]);

  // Add favorite will change erase data from all contact
  useEffect(() => {
    if (sessionStorage.getItem("favorite")) {
      setFavoriteItem([...favorite]);
      const myArrayFiltered = removeArray(allContact, favoriteItem);
      setAllContact([...myArrayFiltered]);

      if (!contactOrFav) {
        const filtered = checkDeletedFavorite(favorite)
        console.log(filtered)
        sessionStorage.setItem("favorite", JSON.stringify([...filtered]));
      }
    }
  }, [favorite]);

  // Reset pagination if toggler contact has been toggled
  useEffect(() => {
    setCurrentPage(0);
  }, [contactOrFav]);

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

  // Initialize Recent Favorite Item
  const favItem: Array<ReactElement> = [];
  favoriteItem
    .sort((a: { first_name: string }, b: { first_name: string }) =>
      ascSort(a.first_name, b.first_name)
    )
    .slice(0, 4)
    .map((data: AllContactType) =>
      favItem.push(
        <a href={`detail/${data.id}`} key={data.id} css={contactFavItemStyle}>
          <i className="fa fa-user-o">
            <i className="fa fa-heart"></i>
          </i>
          <span>{data.first_name}</span>
        </a>
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
          <p
            css={{
              margin: 0,
              width: "200%",
              fontSize: 14,
              fontWeight: 500,
              textAlign: "start",
            }}
          >
            No contact
          </p>
        )}
      </div>
      <div css={shortcutContactStyle}>
        <span
          onClick={() => {
            dispatch(toggle(true));
          }}
          className={`${contactOrFav ? "active" : ""}`}
        >
          All Contacts
        </span>
        <span
          className={`${contactOrFav ? "" : "active"}`}
          onClick={() => {
            dispatch(toggle(false));
          }}
        >
          Favorites
        </span>
      </div>
      <AllContact
        contact={contactOrFav ? allContact : favoriteItem}
        currentPage={currentPage}
        favorite={!contactOrFav}
        filteredData={filteredData}
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
