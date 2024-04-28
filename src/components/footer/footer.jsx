import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'

export default function Footer() {
  return (
    <>
      <footer id="footer" className='pt-3 mt-5'>
        {/* FOOTER LIST------------------------ */}
        <div className="footer__list">
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-lg-2">
                <div className="footer__item">
                  <h6>QUICK LINKS</h6>
                  <ul>
                    <li><Link to='/home'><span><i className="fas fa-angle-double-right" /></span> Home</Link></li>
                    <li><a href="#movieList"><span><i className="fas fa-angle-double-right" /></span> Movies</a></li>
                    <li><a href="#"><span><i className="fas fa-angle-double-right" /></span> News</a></li>
                    <li><a href="#"><span><i className="fas fa-angle-double-right" /></span> Admin Page</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="footer__item">
                  <h6>HELP &amp; SUPPORT</h6>
                  <ul>
                    <li><a href="#"><span><i className="fas fa-angle-double-right" /></span> Live Chart</a>
                    </li>
                    <li><a href="#"><span><i className="fas fa-angle-double-right" /></span> Faq</a></li>
                    <li><a href="#"><span><i className="fas fa-angle-double-right" /></span> Support</a></li>
                    <li><a href="#"><span><i className="fas fa-angle-double-right" /></span> Terms of
                      Services</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="footer__item2">
                  <h6>CONTACT</h6>
                  <ul>
                    <li><a href="mailto:hiep.nguyen6296@gmail.com"><span><i className="far fa-envelope" /></span>
                      hiep.nguyen6296@gmail.com</a></li>
                    <li><a href="tel:+84939621996"><span><i className="fas fa-phone" /></span>
                      +84-0939-621-996</a></li>
                    <li><a href="#"><span><i className="fas fa-map-marker-alt" /></span> Ho Chi Minh city, Vietnam</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-6 col-lg-4">
                <div className="footer__item3">
                  <h6>ABOUT</h6>
                  <p>This page is one of my capstones in Fullstack bootcamp course of CyberSoft Academy center. It may contain some flaws,as I am a newbie in this profession. Hope you guys forgive it!</p>
                  <ul>
                    <li><a href='https://www.facebook.com/hiepnguyenct/' target="_blank"><i className="fab fa-facebook-f" /></a></li>
                    <li><a href='https://www.linkedin.com/in/hiep-nguyen-183500228/' target="_blank"><i className="fab fa-linkedin-in" /></a></li>
                    <li><a href='https://github.com/emganek' target="_blank"><i className="fab fa-github" /></a></li>
                    <li><i className="fab fa-twitter" /></li>
                    <li><i className="fab fa-google-plus-g" /></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* COPY RIGHT------------------ */}
      <div className="copyRight">
        <p className="my-0">@2022 Capstone 3. All rights reserved. Design by Hiep Nguyen</p>
      </div>
    </>
  )
}
