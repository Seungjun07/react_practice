const Button = ({ text, color = 'black', children }) => {

    function onClickButton(e){
        console.log(e);
        console.log(text);
    };

    return (
        <button 
        onClick={onClickButton}
        style={{ color: color }}>
            {text} - {color.toUpperCase()}
            {children}
        </button>
    )
};


export default Button;