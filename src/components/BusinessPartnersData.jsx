import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useContext,
  useRef
} from "react";
import { BusinessPartnersContext } from "../contexts/BusinessPartnersContext";
import { businessPartnersService } from "../services/BusinessPartnersService";
import { businessPartnersConstants } from "../constants/BusinessPartnersConstants";


const BusinessPartnersData = forwardRef((props, ref) => {

  const { businessPartnersState, dispatch } = useContext(BusinessPartnersContext);

  const someFetchActionCreator = () => {
    const getDocumentsInfoHandler = async () => {
      await businessPartnersService.getBPartners(dispatch);
    };

    getDocumentsInfoHandler();
  };


  useEffect(() => {

    someFetchActionCreator();

  }, [dispatch]);


  const update = (e, bpartner) => {

    dispatch({ type: businessPartnersConstants.UPDATE_BPARTNER_DATA_MODAL_SHOW, bpartner });


  };

  const deleteBPartner = async (e, bpartner) => {

    await businessPartnersService.deleteBPartner(dispatch, bpartner);


  };

  return (

    <div>
      <h1 class="paragraph-box" style={{ fontSize: 28 }} ><b>Business partners</b></h1>

      <div class="contact-box">
        {
          <table style={{ border: "1px solid gray", width: 1400, background: "white" }}>
            <thead>


              <tr>
                <th style={{ border: "1px solid gray" }}>Name</th>
                <th style={{ border: "1px solid gray" }}>Primary phone</th>
                <th style={{ border: "1px solid gray" }}>Secondary phone</th>
                <th style={{ border: "1px solid gray" }}>Email</th>
                <th style={{ border: "1px solid gray" }}>Address</th>
                <th style={{ border: "1px solid gray" }}>Website</th>
                <th style={{ border: "1px solid gray" }}>Logo</th>
                <th style={{ border: "1px solid gray" }}>Logo dimensions</th>
                <th style={{ border: "1px solid gray" }}>Lock code</th>
                <th style={{ border: "1px solid gray" }}>Support text</th>
                <th style={{ border: "1px solid gray" }}>Update</th>
                <th style={{ border: "1px solid gray" }}>Delete</th>
              </tr>
            </thead>

            {businessPartnersState.bpartners.bpartners.map((bpartner) => (
              <tbody>
                <tr>
                  <td style={{ border: "1px solid gray" }}>{bpartner.name}</td>
                  <td style={{ border: "1px solid gray" }}>{bpartner.contact.phone}</td>
                  <td style={{ border: "1px solid gray" }}>{bpartner.contact.phone2}</td>
                  <td style={{ border: "1px solid gray" }}>{bpartner.contact.email}</td>
                  <td style={{ border: "1px solid gray" }}>{bpartner.contact.location.street}</td>
                  <td style={{ border: "1px solid gray" }}>{bpartner.contact.webURL}</td>
                  <td style={{ border: "1px solid gray" }}><img src={bpartner.logo}></img></td>
                  <td style={{ border: "1px solid gray" }}>{bpartner.dimensions.height} x {bpartner.dimensions.width}</td>
                  <td style={{ border: "1px solid gray" }}>{bpartner.lockCode}</td>
                  <td style={{ border: "1px solid gray" }}>{bpartner.support.english}</td>
                  <td style={{ border: "1px solid gray" }}><button onClick={(e) => update(e, bpartner)} >Update</button></td>
                  <td style={{ border: "1px solid gray" }}><button onClick={(e) => deleteBPartner(e, bpartner.id)} >Delete</button></td>

                </tr>
              </tbody>))
            }
          </table>
        }
      </div>
    </div>

  );
});

export default BusinessPartnersData
