/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { editPhoneStyle } from "../style/js/emotion";
import { useMutation } from "@apollo/client";
import { EDIT_PHONE_NUMBER } from "../services/queries";

const EditPhoneNumber = (props: {
  data: any;
  totalPhone: number;
  id: string | undefined;
}) => {
  const { data, id } = props;
  const [inputPhone, setInputPhone] = useState<string>("");
  const [nationPhone, setNationPhone] = useState<string>("+62");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const nation = data.number.substring(0, 3);
    const number = data.number.substring(3);
    setNationPhone(nation);
    setInputPhone(number);
  }, []);

  const onSubmit = () => {
    setNationPhone("+62");
    setDisabled((prev) => !prev);

    if (!disabled) {
      const text = `${nationPhone}${inputPhone}`;
      const datas = {
        pk_columns: {
          number: data?.number,
          contact_id: id,
        },
        new_phone_number: text,
      };

      editPhone({ variables: datas }).then(() => {
        window.location.reload();
      });
    }
  };
  const [editPhone] = useMutation(EDIT_PHONE_NUMBER);

  const getPhoneNumbers = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPhone(e.currentTarget.value);
  };

  const getNationNumbers = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setNationPhone(e.currentTarget.value);

  return (
    <label css={editPhoneStyle} htmlFor="Phone number">
      Phone number
      <div className={`has-select ${disabled ? "is-disabled" : ""}`}>
        <select
          defaultValue={data?.number.substring(0, 3)}
          disabled={disabled}
          onChange={(e) => getNationNumbers(e)}
        >
          <option value="+62">+62</option>
          <option value="+21">+21</option>
        </select>
        <input
          onChange={(e) => getPhoneNumbers(e)}
          type="number"
          placeholder={data?.number.substring(3)}
          disabled={disabled}
        />
        <i onClick={() => onSubmit()} className="fa fa-edit"></i>
      </div>
    </label>
  );
};

export default EditPhoneNumber;
