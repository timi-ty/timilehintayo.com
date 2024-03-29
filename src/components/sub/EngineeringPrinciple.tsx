import "./EngineeringPrinciple.scss";

interface Props {
  title: string;
  description: string;
  image: string;
}

function EngineeringPrinciple({ title, description, image }: Props) {
  return (
    <div className="engineering-principle">
      <div className="top">
        <div className="title">{title}</div>
        <div className="description">{description}</div>
      </div>
      <div className="bottom">
        <img className="image" src={image} />
      </div>
    </div>
  );
}

export default EngineeringPrinciple;
