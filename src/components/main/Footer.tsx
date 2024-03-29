import "./Footer.scss";

interface Props {
  id: string;
}

function Footer({ id }: Props) {
  return (
    <div id={id} className="footer">
      Built with React.js © 2024 Timilehin Tayo
    </div>
  );
}

export default Footer;
