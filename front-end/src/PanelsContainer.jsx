import React from 'react';
import {PanelsContainerStyled, PanelStyled} from "./styles"


function PanelsContainer( {panels, panelRefs}) {

   

    return (
        <PanelsContainerStyled>
             {panels.map((data, index) => {

            return (
                
                <PanelStyled
                key={index}
                ref={(el) => (panelRefs.current[index] = el)}
                >
                    <img src={data.imgSrc} alt={data.alt}></img>
  
                    <p>
                        <b> {data.title}</b> 
                        {data.text}
                    </p>
    
                </PanelStyled>
            )


            })}
        </PanelsContainerStyled>
    ) 
   
}

export default PanelsContainer