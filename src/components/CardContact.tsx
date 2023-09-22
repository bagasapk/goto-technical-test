/** @jsxImportSource @emotion/react */
import { useState } from "react";
import {
  errorStyle,
  listContactItemStyle,
  loadingDiv,
  loadingStyle,
} from "../style/js/emotion";
import { AllContactType, FavoriteState } from "../services/interfaces";
import { useLazyQuery, useMutation } from "@apollo/client";
import { DELETE_POST, GET_DETAIL_CONTACT_BY_ID } from "../services/queries";
import { useDispatch, useSelector } from "react-redux";
import { init, remove } from "../services/favoriteSlice";

const CardContact = (props: { data: AllContactType }) => {
  const { data } = props;
  const [expanded, setExpanded] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [getDetailContact] = useLazyQuery(GET_DETAIL_CONTACT_BY_ID, {
    variables: { id: data.id },
  });
  const [addTodo, { loading, error }] = useMutation(DELETE_POST);
  const contactOrFav = useSelector(
    (state: { favorite: FavoriteState }) => state.favorite.contactOrFav
  );
  const dispatch = useDispatch();

  /**Add Favorite */
  const addFavorite = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setFavorite(!favorite);

    if (!favorite && contactOrFav) {
      // Get contact detail by id, then store it to sessionStorage
      getDetailContact().then((x) => {
        const text = x.data.contact_by_pk;
        if (sessionStorage.getItem("favorite")) {
          const objFav: Array<object> = JSON.parse(
            sessionStorage.getItem("favorite") || "{}"
          );
          const sessionFav = JSON.stringify([...objFav, text]);
          sessionStorage.setItem("favorite", sessionFav);
        } else {
          sessionStorage.setItem("favorite", JSON.stringify([text]));
        }
        dispatch(init(text));
      });
    }

    if (!contactOrFav) {
      getDetailContact().then(({ data }) => {
        dispatch(remove(data.contact_by_pk));
      });
    }
  };

  const DeleteContact = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    addTodo({ variables: { id: data.id } }).then((data: object) => {
      if (data) {
        window.location.href = "/";
      }
    });
  };

  return (
    <a
      key={data.id}
      href={`/detail/${data.id}`}
      css={[listContactItemStyle, loading && loadingDiv]}
      className={expanded ? "expanded" : ""}
    >
      <div css={error ? errorStyle : { display: "none" }} className="error">
        {error?.message}
      </div>
      <div
        css={loading ? loadingStyle : { display: "none" }}
        className="loading"
      >
        {" "}
      </div>
      <div className="card">
        <i className="fa fa-user-o"></i>
        <div>
          <span>
            {data.first_name} {data.last_name}
          </span>
          <span>{data.phones[0]?.number}</span>
          <i
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              e.preventDefault();
              setExpanded(!expanded);
            }}
            className={`card__toggle fa fa-chevron-right ${
              expanded ? "active" : ""
            }`}
          ></i>
        </div>
      </div>
      <div className="card__control">
        <span onClick={DeleteContact} className="card__control--delete">
          <i className="fa fa-trash"></i>
        </span>
        <span
          onClick={addFavorite}
          className={`card__control--star ${favorite ? "active" : ""} ${
            !contactOrFav ? "active" : ""
          }`}
        >
          <i className="fa fa-heart"></i>
        </span>
      </div>
    </a>
  );
};

export default CardContact;
