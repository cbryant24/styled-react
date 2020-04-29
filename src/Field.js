import React from 'react';
import { Form, Field } from '@cbryant24/styled-react';

export default (props) => {

  return (
    <Form themeStyle={["authForm", "authFormLarge"]} remove={["height", "color"]} color="blue" height="20em">
      <Field data={{name: "  eevee plays   "}} inputStyle={{themeStyle: "inputMain"}} remove="height" height="2rem"/>
    </Form>
  )
}