import { page } from "../../../lib/courseStore";
function Order(props: { page?: page }) {
  return (
    <div className="order-page">
      <h3>{props.page?.title}</h3>
    </div>);
}

export default Order;