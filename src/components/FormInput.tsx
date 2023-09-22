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
import { gql, useMutation, useLazyQuery } from "@apollo/client";
import { GET_DETAIL_CONTACT } from "../services/queries";

interface bodyItem {
  first_name: String;
  last_name: String;
  phones: [
    {
      number: String;
    }
  ];
}

const FormInput = () => {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [inputPhone, setInputPhone] = useState<any>({
    0: {
      number: "",
    },
  });
  const [nationPhone, setNationPhone] = useState<any>({
    0: {
      nation: "+62",
    },
  });
  const [totalPhone, setTotalPhone] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");

  const [getDetailContact, detailContact] = useLazyQuery(GET_DETAIL_CONTACT);

  useEffect(() => {
    setErrorMsg("");
    if (first_name.length && last_name.length) {
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
            setErrorMsg("Contact already exists! Please use another name");
          }
        });
      }, 1000);
    }
  }, [first_name, last_name]);

  const getPhoneNumbers = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: number
  ) => {
    setInputPhone({ ...inputPhone, [key]: { number: e.currentTarget.value } });
  };

  const getNationNumbers = (
    e: React.ChangeEvent<HTMLSelectElement>,
    key: number
  ) =>
    setNationPhone({
      ...nationPhone,
      [key]: { nation: e.currentTarget.value },
    });

  function onSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const data: any = [];
    for (let i = 0; i < totalPhone; i++) {
      const number = `${nationPhone[i] ? nationPhone[i].nation : "+62"}${
        inputPhone[i].number
      }`;
      data.push({ number });
    }

    const item: bodyItem = {
      first_name: first_name,
      last_name: last_name,
      phones: data,
    };

    addTodo({ variables: item });
  }

  const POST_CONTACT = gql`
    mutation AddContactWithPhones(
      $first_name: String!
      $last_name: String!
      $phones: [phone_insert_input!]!
    ) {
      insert_contact(
        objects: {
          first_name: $first_name
          last_name: $last_name
          phones: { data: $phones }
        }
      ) {
        returning {
          first_name
          last_name
          id
          phones {
            number
          }
        }
      }
    }
  `;

  const [addTodo, { data, loading, error }] = useMutation(POST_CONTACT);

  if (data) {
    window.location.href = "/";
  }

  const totalPhoneHtml = [];
  for (let i = 0; i < totalPhone; i++) {
    totalPhoneHtml.push(
      <label key={i} htmlFor="Phone number">
        Phone number
        <div className="has-select">
          <select onChange={(e) => getNationNumbers(e, i)}>
            <option value="+62">+62</option>
            <option value="+21">+21</option>
          </select>
          <input
            required
            onChange={(e) => getPhoneNumbers(e, i)}
            type="number"
            placeholder="899999999"
          />
        </div>
      </label>
    );
  }

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
        <h2>Add contact</h2>
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
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (first_name.length || last_name.length) {
                  const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
                  const check = format.test(first_name);
                }
                setFirst_name(e.currentTarget.value);
              }}
              type="text"
              name="first_name"
              id="first_name"
              placeholder="John"
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
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLast_name(e.currentTarget.value)
              }
              type="text"
              name="last_name"
              id="last_name"
              placeholder="Doe"
            />
            <i className="fa fa-user-o"></i>
          </div>
        </label>
        {totalPhoneHtml}
        <span
          onClick={() => setTotalPhone((prev) => prev + 1)}
          className="form__add"
        >
          + Add phone number
        </span>
        <div className="buttons">
          <a href="/">Cancel</a>
          <button disabled={!!errorMsg} type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormInput;
