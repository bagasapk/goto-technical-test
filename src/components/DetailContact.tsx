/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import {
  contactStyle,
  detailContactStyle,
  errorStyle,
  icon,
  loadingDiv,
  loadingStyle,
} from "../style/js/emotion";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { DELETE_POST, GET_DETAIL_CONTACT_BY_ID } from "../services/queries";
import { useDispatch, useSelector } from "react-redux";
import { init, remove } from "../services/favoriteSlice";
import { checkDeletedFavorite } from "../services/helpers";
import { AllContactType } from "../services/interfaces";

interface bodyItem {
  first_name: String;
  last_name: String;
  phones: [
    {
      number: String;
    }
  ];
}

const DetailContact = () => {
  let { id } = useParams();

  const [expanded, setExpanded] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [getDetailContact, { data, loading, error }] = useLazyQuery(
    GET_DETAIL_CONTACT_BY_ID,
    {
      variables: { id: id },
    }
  );
  const dispatch = useDispatch();
  const favoriteState = useSelector((state: any) => state.favorite.item);

  // Check if favState inside session
  useEffect(() => {
    getDetailContact().then(({ data }) => {
      if (sessionStorage.getItem("favorite")) {
        const objFav: Array<AllContactType> = JSON.parse(
          sessionStorage.getItem("favorite") || "{}"
        );

        const checker = objFav.filter(
          (dataObj) => dataObj.id == data?.contact_by_pk.id
        );
        if (checker.length == 1) {
          setFavorite((prev) => (prev = true));
        }
      }
    });
  }, []);

  // Delete session after remove item from favState
  useEffect(() => {
    const filtered = checkDeletedFavorite(favoriteState);
    sessionStorage.setItem("favorite", JSON.stringify([...filtered]));
  }, [favoriteState]);

  const AddFavorite = () => {
    const text = data.contact_by_pk;
    setFavorite((prev) => !prev);
    if (!favorite) {
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
    } else {
      dispatch(remove(text));
    }
  };

  const totalPhoneHtml: any = [];
  data?.contact_by_pk?.phones.map((data: any, key: number) => {
    totalPhoneHtml.push(
      <div key={key}>
        Phone number {key + 1}
        <div className="detail--has-select">
          <i className="fa fa-phone"></i>
          <p>{data.number}</p>
        </div>
      </div>
    );
  });

  const [deletePost, deleteAction] = useMutation(DELETE_POST);

  const DeletingPost = () => {
    deletePost({ variables: { id: id } }).then(() => {
      window.location.href = "/";
    });
  };

  return (
    <div css={[contactStyle, detailContactStyle, loading ? loadingDiv : null]}>
      <div
        css={error || deleteAction.error ? errorStyle : { display: "none" }}
        className="error"
      >
        {error ? error.message : deleteAction.error?.message}
      </div>
      <div
        css={
          loading || deleteAction.loading ? loadingStyle : { display: "none" }
        }
        className="loading"
      ></div>

      <i onClick={() => AddFavorite()} className={`fa fa-heart ${favorite && 'active'}`}></i>

      <a href="/" className="detail__back">
        <i className="fa fa-chevron-left"></i>
      </a>
      <i
        onClick={() => setExpanded((prev) => !prev)}
        className={`${expanded ? "expanded" : ""} fa fa-ellipsis-v`}
      ></i>
      <ul className="detail__menu">
        <li>
          <a href={`/edit/${id}`}>Edit</a>
        </li>
        <li onClick={() => AddFavorite()}>
          {favorite ? "Unset from favorite" : "Set as favorite"}
        </li>
        <li onClick={() => DeletingPost()}>Delete</li>
      </ul>
      <div className="detail">
        <h2>Detail contact</h2>
        <i css={icon} className="fa fa-user-o"></i>
      </div>
      <p>Personal Information</p>
      <div className="detail__info">
        <div>
          First Name
          <div>
            <p>{data?.contact_by_pk.first_name}</p>
            <i className="fa fa-user"></i>
          </div>
        </div>
        <div>
          Last Name
          <div>
            <p>{data?.contact_by_pk.last_name}</p>
            <i className="fa fa-user-o"></i>
          </div>
        </div>
        {totalPhoneHtml}
      </div>
    </div>
  );
};

export default DetailContact;
