import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { setFilter } from "../redux/filter";


const SearchBox = () => {
  const dispatch = useDispatch();

  return (
    <div className="find-contact-div">
      <h2>Find contacts by name</h2>
      <Formik
        initialValues={{ searchTerm: '' }} 
        onSubmit={(values) => {
          dispatch(setFilter(values.searchTerm)); 
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <Field
              type="text"
              name="searchTerm"
              placeholder="Search contacts"
              className="search-field"
              value={values.searchTerm} 
              onChange={(event) => {
                handleChange(event);
                dispatch(setFilter(event.target.value)); 
              }}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchBox;
