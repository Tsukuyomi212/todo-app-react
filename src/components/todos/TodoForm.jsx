import { Formik, Form, Field } from 'formik';

export const TodoForm = ({ handleSubmit, todo }) => {
  return (
    <Formik
      initialValues={{ title: todo ? todo.title : '' }}
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values);
        resetForm();
      }}
      enableReinitialize
    >
      {() => (
        <Form>
          <Field name="title" placeholder="..." />
          <button type="submit">{todo ? 'Update' : 'Add'}</button>
        </Form>
      )}
    </Formik>
  );
};
