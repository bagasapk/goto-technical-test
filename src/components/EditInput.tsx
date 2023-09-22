/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import {
  contactStyle,
  errorStyle,
  formInput,
  icon,
  loadingDiv,
  loadingStyle,
} from "../style/js/emotion";
import { gql, useMutation, useLazyQuery, useQuery } from "@apollo/client";
import {
  GET_DETAIL_CONTACT,
  GET_DETAIL_CONTACT_BY_ID,
} from "../services/queries";
import { useParams } from "react-router-dom";
import EditPhoneNumber from "./EditPhoneNumber";

interface bodyItem {
  id: number;
  _set: {
    first_name: string;
    last_name: string;
  };
}

const EditInput = () => {
  let { id } = useParams();

  const [totalPhone, setTotalPhone] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");

  const [getDetailContact, detailContact] = useLazyQuery(GET_DETAIL_CONTACT);
  const { data, loading, error } = useQuery(GET_DETAIL_CONTACT_BY_ID, {
    variables: { id: id },
  });

  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");

  useEffect(() => {
    setFirst_name(data?.contact_by_pk.first_name);
    setLast_name(data?.contact_by_pk.last_name);
  }, []);

  useEffect(() => {
    setErrorMsg("");
    if (first_name?.length && last_name?.length) {
      setTimeout(() => {
        getDetailContact({
          variables: {
            where: {
              last_name: {
                _like: last_name.toString(),
              },
              first_name: {
                _like: first_name.toString(),
              },
            },
          },
        }).then(({ data }) => {
          if (data?.contact.length) {
            setErrorMsg("Contact already exists! Please use another name. If that's your current name, leave it as is.");
          }
        });
      }, 1000);
    }
  }, [first_name, last_name]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const contactItem: bodyItem = {
      id: Number(id),
      _set: {
        first_name: first_name,
        last_name: last_name,
      },
    };

    addTodo({ variables: contactItem }).then(() => {
      window.location.href = "/";
    });
  }

  const EDIT_CONTACT = gql`
    mutation EditContactById($id: Int!, $_set: contact_set_input) {
      update_contact_by_pk(pk_columns: { id: $id }, _set: $_set) {
        id
        first_name
        last_name
        phones {
          number
        }
      }
    }
  `;

  const [addTodo] = useMutation(EDIT_CONTACT);

  const totalPhoneHtml: any[] = [];
  data?.contact_by_pk.phones.map((data: any, key: number) => {
    totalPhoneHtml.push(
      <EditPhoneNumber
        key={key}
        id={id}
        data={data}
        totalPhone={totalPhone}
      ></EditPhoneNumber>
    );
  });

  return (
    <div css={[contactStyle, formInput, loading ? loadingDiv : null]}>
      <div
        css={error || errorMsg ? errorStyle : { display: "none" }}
        className="error"
      >
        {error ? error.message : errorMsg}
      </div>
      <div
        css={loading ? loadingStyle : { display: "none" }}
        className="loading"
      >
        {" "}
      </div>
      <div>
        <h2>Edit contact</h2>
        <i css={icon} className="fa fa-user-o"></i>
      </div>
      <p>Personal Information</p>
      <form onSubmit={(e) => onSubmit(e)}>
        <label htmlFor="first_name">
          First Name
          <div>
            <input
              pattern="[A-Za-z]*"
              className={errorMsg && "danger"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFirst_name(e.currentTarget.value);
              }}
              type="text"
              name="first_name"
              id="first_name"
              placeholder={data?.contact_by_pk.first_name}
            />
            <i className="fa fa-user"></i>
          </div>
        </label>
        <label htmlFor="last_name">
          Last Name
          <div>
            <input
              pattern="[A-Za-z]*"
              className={errorMsg && "danger"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLast_name(e.currentTarget.value)
              }
              type="text"
              name="last_name"
              id="last_name"
              placeholder={data?.contact_by_pk.last_name}
            />
            <i className="fa fa-user-o"></i>
          </div>
        </label>
        {totalPhoneHtml}
        <div className="buttons">
          <a href="/">Cancel</a>
          <button disabled={!!errorMsg} type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditInput;
