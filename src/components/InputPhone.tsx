/** @jsxImportSource @emotion/react */
import {  inputPhoneStyle } from "../style/js/emotion";

const InputPhone = (props: {
  getNationNumbers: Function;
  getPhoneNumbers: Function;
  dataKey: number;
  onClose: Function;
}) => {
  return (
    <label css={inputPhoneStyle} htmlFor="Phone number">
      Phone number
      <div className="has-select">
        <select onChange={(e) => props.getNationNumbers(e, props.dataKey)}>
          <option value="+62">+62</option>
          <option value="+21">+21</option>
        </select>
        <input
          required
          onChange={(e) => props.getPhoneNumbers(e, props.dataKey)}
          type="number"
          placeholder="899999999"
        />
        {props.dataKey && props.dataKey > 0 ? (
          <i onClick={() => props.onClose()} className="fa fa-close"></i>
        ) : null}
      </div>
    </label>
  );
};

export default InputPhone;
