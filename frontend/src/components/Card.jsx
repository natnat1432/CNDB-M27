export default function Card({ content }) {
  return (
    <div className="card w-50">
      <div className="card-body">
        <h1 className="page-header">{content}</h1>
      </div>
      <div className="card-arrow">
        <div className="card-arrow-top-left"></div>
        <div className="card-arrow-top-right"></div>
        <div className="card-arrow-bottom-left"></div>
        <div className="card-arrow-bottom-right"></div>
      </div>
    </div>
  );
}
