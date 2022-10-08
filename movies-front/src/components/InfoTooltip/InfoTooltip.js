import union1 from '../../images/UnionSuc.svg';
import union2 from '../../images/UnionErr.svg';
import './InfoTooltip.css';

function InfoTooltip({state, onClose}) {
  const className = `popup ${state.isOpen ? "popup_active" : ""}`;
  const image = ((state.status === "success") ? union1 : union2);

  return (
    <div className={className}>
      <div className="popup__container">
        <div className="popup__body popup__overlay">
          <img src={image} className="popup__union" alt="" />
          <p className="popup__subtitle">{state.text}</p>
          <button
            className="popup__close popup__close_profile"
            type="button"
            onClick={onClose}
          ></button>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
