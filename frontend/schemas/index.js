import * as Yup from "yup";

export const ContactUsSchema = Yup.object().shape({
  name: Yup.string().required("name"),
  contactEmail: Yup.string().required("contact email"),
  phoneNumber: Yup.string().required("phone number"),
  subject: Yup.string().required("subject"),
  message: Yup.string().required("message"),
});
