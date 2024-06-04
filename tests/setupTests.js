import Enzyme from "enzyme";
import ReactEighteenAdapter from "@cfaester/enzyme-adapter-react-18";

Enzyme.configure({ adapter: new ReactEighteenAdapter() });
