export default function Button({children, variant= 'solid', width = 'fit', ...props}){
    //variant=['solid', 'text-button'];
  
    let style = "px-3 py-2 font-semibold uppercase rounded overflow-hidden whitespace-nowrap"

    if (width === 'full'){
        style += " w-full"
    }if(width === 'fit'){
        style += " min-w-[60px]"
    }

    if (variant === 'solid'){
      style += " text-stone-900 bg-indigo-400 hover:bg-indigo-600"
    }if(variant === 'text-button'){
      style += " text-indigo-400 hover:text-stone-900 hover:bg-indigo-600"
    }
  
    return(
      <button 
      className={style} {...props}>
        {children}
      </button>
    )
  };