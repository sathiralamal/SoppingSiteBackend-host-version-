import React,{Component} from "react";
import '../../css/animate.css';
import '../../css/bootstrap.min.css';
import '../../css/flaticon.css';
import '../../css/font-awesome.min.css';


import '../../css/slicknav.min.css';
import '../../css/style.css';

class DefaultFooter extends Component{

    render() {
        return <div>

            <section className="footer-section" >

                <div className="container">
                    <div className="footer-logo text-center">
                        <a href="index.html"><img src="images/logo-light.png" alt=""/></a>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-sm-6">
                            <div className="footer-widget about-widget">
                                <h2>About</h2>
                                <p>We are an online fashion store that provides fashion goods with safe authentication for users which provides more secure payment methods. </p>
                                <img src="images/cards.png" alt=""/>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="footer-widget about-widget">
                                <h2>Questions</h2>
                                <ul>
                                    <li><a href="index.html">About Us</a></li>
                                    <li><a href="index.html">Track Orders</a></li>
                                    <li><a href="index.html">Returns</a></li>
                                    <li><a href="index.html">Jobs</a></li>
                                    <li><a href="index.html">Shipping</a></li>
                                    <li><a href="index.html">Blog</a></li>
                                </ul>
                                <ul>
                                    <li><a href="index.html">Partners</a></li>
                                    <li><a href="index.html">Bloggers</a></li>
                                    <li><a href="index.html">Support</a></li>
                                    <li><a href="index.html">Terms of Use</a></li>
                                    <li><a href="index.html">Press</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="footer-widget about-widget">
                                <h2>Questions</h2>
                                <div className="fw-latest-post-widget">
                                    <div className="lp-item">
                                        <div className="lp-thumb set-bg" data-setbg="images/blog-thumbs/1.jpg"></div>
                                        <div className="lp-content">
                                            <h6>what shoes to wear</h6>
                                            <span>Oct 21, 2018</span>
                                            <a href="index.html" className="readmore">Read More</a>
                                        </div>
                                    </div>
                                    <div className="lp-item">
                                        <div className="lp-thumb set-bg" data-setbg="images/blog-thumbs/2.jpg"></div>
                                        <div className="lp-content">
                                            <h6>trends this year</h6>
                                            <span>Oct 21, 2018</span>
                                            <a href="index.html" className="readmore">Read More</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="footer-widget contact-widget">
                                <h2>Questions</h2>
                                <div className="con-info">
                                    <span>C.</span>
                                    <p>Your Company Ltd </p>
                                </div>
                                <div className="con-info">
                                    <span>B.</span>
                                    <p>1481 Creekside Lane Avila Beach, CA 93424, P.O. BOX 68 </p>
                                </div>
                                <div className="con-info">
                                    <span>T.</span>
                                    <p>+53 345 7953 32453</p>
                                </div>
                                <div className="con-info">
                                    <span>E.</span>
                                    <p>office@youremail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="social-links-warp">
                    <div className="container">
                        <div className="social-links">
                            <a href="index.html" className="instagram"><i
                                className="fa fa-instagram"></i><span>instagram</span></a>
                            <a href="index.html" className="google-plus"><i className="fa fa-google-plus"></i><span>g+plus</span></a>
                            <a href="index.html" className="pinterest"><i
                                className="fa fa-pinterest"></i><span>pinterest</span></a>
                            <a href="index.html" className="facebook"><i className="fa fa-facebook"></i><span>facebook</span></a>
                            <a href="index.html" className="twitter"><i className="fa fa-twitter"></i><span>twitter</span></a>
                            <a href="index.html" className="youtube"><i className="fa fa-youtube"></i><span>youtube</span></a>
                            <a href="index.html" className="tumblr"><i className="fa fa-tumblr-square"></i><span>tumblr</span></a>
                        </div>


                    </div>
                </div>
            </section>



        </div>;
    }

}

export default DefaultFooter;