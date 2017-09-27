import React from 'react';
import createReactClass from 'create-react-class';
import {Jumbotron} from 'react-bootstrap';
import './ResumePage.css'


var ResumePage = createReactClass ({
  render(){
    return (
      <div id="content" className="container">
        <Jumbotron className="text-center">
          <h1>Resume</h1>
        </Jumbotron>
        <div id="download">
          Download:&nbsp;
          <a href="/files/ZelenkaChrisResume.pdf">PDF</a>
          &nbsp;|&nbsp; 
          <a href="/files/ZelenkaChrisResume.docs">DOC</a>
        </div>
        <div id="resume_border">
          <div id="name" className="mb-5">
            <h2 className="text-center title">Christopher Zelenka</h2>
          </div>
          <div id="objective" className="mb-5">
            <h4 className="title"> Objective</h4>
            <hr></hr>
            <p>Seeking opportunities in Software Engineering or Web Development.</p>
          </div>
          <div id="skills" className="mb-5">
            <h4 className="title">Skills</h4>
            <hr></hr>
            <p><strong>Proficient In:</strong> Node.js, React, Javascript, Java, Python, HTML, CSS, MySQL, Git.</p>
            <p><strong>Competent In:</strong> C++, C#, PHP, Linux.</p>
            <p><strong>Bilingual:</strong> English and Japanese.</p>
          </div>
          <div id="experience" className="mb-5">
            <h4 className="title">Experience</h4>
            <hr></hr>
            <div id="diverta" className="mb-4">
              <div className="d-flex w-100 justify-content-between">
                <p className="italics">Engineer Intern</p>
                <p className="title">Diverta Inc., Tokyo, Japan</p>
                <p>Jun 2016 ~ Nov 2016</p>
              </div>
              <ul>
                <li>Implemented and tested new features and tools for Diverta's R-CMS (Relational Contents Management System) which gave Designers and Developers more control of creating content.</li>
                <ul>
                  <li>Tools and features such as Manual sorting, Google maps support, Instagram support, Search functionality and etc. were implemented using PHP + Smarty and Javascript </li>
                </ul>
                <li>Create an automated response device to interact real time with customers using Raspberry Pi / Android device and a BluetoothLE Camera.</li>
                <li>Partake in Japanese work culture while learning programming terminologies to better communicate in Japanese with co-workers and clients.</li>
              </ul>
            </div>
            <div id="enecsys" className="mb-4">
              <div className="d-flex w-100 justify-content-between">
                <p className="italics">Engineer Intern</p>
                <p className="title">Enecsys LLC, Newark, California</p>
                <p>Jun 2014 ~ Aug 2014</p>
              </div>
              <ul>
                <li>Reimplemented testing environment (Chroma) for Inverters to run more efficiently, cutting overall time by ~20% and fixing known problems that occurred randomly.</li>
                <ul>
                  <li>Testing environment used a mixture of Python scripts and Chroma Software.</li>
                </ul>
                <li>Generated and organized test reports of hundreds of inverters.</li>
                <li>Monitored statistics of Solar panels which used Enecsys Inverters and Gateways on a test and live environment, generating a daily report while referencing Weather Underground for accuracy.</li>
                <li>Created Python and Visual Basic scripts to simplify and reduce a month of time on tasks.</li>
              </ul>
            </div>
            <div id="svmi" className="mb-4">
              <div className="d-flex w-100 justify-content-between">
                <p className="italics">Engineer aid</p>
                <p className="title">Silicon Valley Medical Instruments Inc., Fremont, California</p>
                <p>Feb 2008 ~ Aug 2012</p>
              </div>
              <ul>
                <li>Assisted R&amp;D lab technicians with the assembly and testing of catheter parts by creating fixtures.</li>
                <ul>
                  <li>Precise angled tube cutter, testing of wire connection for catheter tools, etc.</li>
                  <li>Fixtures were designed in SolidWorks as 3D models, shop drawings were sent for creation.</li>
                </ul>
                <li>Programmed using BASIC for a PARALLAX board to simulate a constant rotation speed for catheters while under varying amounts of friction.</li>
              </ul>
            </div>
          </div>
          <div id="projects" className="mb-5">
            <h4 className="title">Projects</h4>
            <hr></hr>
            <ul>
              <li>Created a personal website incorporating Node.js, React and Raspberry Pi to host my blog, projects and resume.</li>
              <li>With a group of students, create an aggregated search engine from scrapping four educational websites.</li>
              <li>Led a group of 9 students for an Operating Systems class, delegating tasks required to finish projects consisting of sequential / multi-threaded process scheduling, memory swapping, page pooling, etc.</li>
              <li>Created games on Android platform utilizing gyro sensors, cameras and more to understand the Android framework.</li>
              <li>Scrap data from a webpage and created my own site using Apache, PHP, Javascript, and MySQL to dynamically store and display collected data over time.  </li>
              <ul>
                <li>Used Jsoup for scraping four websites, MySQL to store the data and PHP to present the data with search-ability.</li>
              </ul>
            </ul>
          </div>
          <div id="education" className="mb-5">
            <h4 className="title">Education</h4>
            <hr></hr>
            <div className="d-flex w-100 justify-content-between">
              <p className="italics">San Jose State University</p>
              <p>B.S. <i>Computer Science</i></p>
              <p>May 2017</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

export default ResumePage;
