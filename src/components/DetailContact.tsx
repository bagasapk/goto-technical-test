/** @jsxImportSource @emotion/react */
import { useState } from "react";
import {
  contactStyle,
  detailContactStyle,
  errorStyle,
  icon,
  loadingDiv,
  loadingStyle,
} from "../style/js/emotion";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { DELETE_POST, GET_DETAIL_CONTACT_BY_ID } from "../services/queries";

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
  const { data, loading, error } = useQuery(GET_DETAIL_CONTACT_BY_ID, {
    variables: { id: id },
  });

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
        <li>Set as favorite</li>
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
