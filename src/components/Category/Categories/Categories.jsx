import { Card } from './Card/Card';

export const Categories = ({ categories }) => {
  return (
    <>
      {/* <!-- BEGIN  CATEGORIES --> */}
      {categories.map((category ,index) => (
        <Card key={index} category={category} />
      ))}
      {/* <!--  CATEGORIES EOF   --> */}
    </>
  );
};
