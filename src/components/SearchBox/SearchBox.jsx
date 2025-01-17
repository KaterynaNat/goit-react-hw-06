import styles from "./SearchBox.module.css";
import { useSelector, useDispatch } from "react-redux";
import { changeFilter } from "../../redux/filtersSlice";
import { selectFilter } from "../../redux/selectors";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(selectFilter);

  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        value={filterValue}
        onChange={handleChange}
        placeholder="Search contacts"
        className={styles.input}
      />
    </div>
  );
};

export default SearchBox;
