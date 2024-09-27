import React from "react";
import Mainadminprofile from "../Mainadminprofile/Mainadminprofile";
import Adminlist from "../ManageAdmin/Adminlist";
// import Addadmins from '../Mainadmin/Addadmins'

export default function Mainadminoverview() {
  return (
    <div>
      <div className="do_la_ho_cards flex">
        <div className="do_la_ho_card">
          <div className="flex do_la_ho_card_doctor">
            <h3>Doctor</h3>
            <div>
              <i class="fi fi-sr-stethoscope"></i>
            </div>
          </div>

          <div className="flex do_la_ho_card_data">
            <div>
              <h2>20K</h2>
              <h4>Visitors</h4>
            </div>

            <div>
              <h2>20K</h2>
              <h4>Visitors</h4>
            </div>
          </div>
        </div>

        <div className="do_la_ho_card do_la_ho_card2">
          <div className="flex do_la_ho_card_doctor">
            <h3>Doctor</h3>
            <div>
              <i class="fi fi-sr-stethoscope"></i>
            </div>
          </div>

          <div className="flex do_la_ho_card_data">
            <div>
              <h2>20K</h2>
              <h4>Visitors</h4>
            </div>

            <div>
              <h2>20K</h2>
              <h4>Visitors</h4>
            </div>
          </div>
        </div>

        <div className="do_la_ho_card do_la_ho_card2">
          <div className="flex do_la_ho_card_doctor">
            <h3>Doctor</h3>
            <div>
              <i class="fi fi-sr-stethoscope"></i>
            </div>
          </div>

          <div className="flex do_la_ho_card_data">
            <div>
              <h2>20K</h2>
              <h4>Visitors</h4>
            </div>

            <div>
              <h2>20K</h2>
              <h4>Visitors</h4>
            </div>
          </div>
        </div>

        <div className="do_la_ho_card do_la_ho_card2">
          <div className="flex do_la_ho_card_doctor">
            <h3>Doctor</h3>
            <div>
              <i class="fi fi-sr-stethoscope"></i>
            </div>
          </div>

          <div className="flex do_la_ho_card_data">
            <div>
              <h2>20K</h2>
              <h4>Visitors</h4>
            </div>

            <div>
              <h2>20K</h2>
              <h4>Visitors</h4>
            </div>
          </div>
        </div>
      </div>

      <Mainadminprofile />

      <Adminlist />
    </div>
  );
}
