import useReveal from '../hooks/useReveal'
import GetInTouchButton from '../components/buttons/GetInTouchButton'
import ViewMyWorkButton from '../components/buttons/ViewMyWorkButton'
import DownloadCVButton from '../components/buttons/DownloadCVButton'
import DotPattern from '../components/backgrounds/DotPattern'
import './homepage.css'
import Rectangle from '../components/shapes/Rectangle'
import Rectangle2 from '../components/shapes/rectanglle2'
import Portfoliocards from '../components/shapes/portfoliocards'
import ResumeSection from '../components/shapes/ResumeSection'
import ContactSection from '../components/contact/ContactSection'

const Homepage = () => {
    useReveal()
    return (
        <div className="homepage">
            <div id="home" className="hero">
                <DotPattern />
                <div className="title" data-reveal>
                    <p>3D Artist, Web / App Dev</p>
                    <p className="subtitle">& Graphic Designer  </p>
                </div>
                <div className="description" data-reveal data-reveal-delay="200">
                    <p>Years of helping brands look sharp from social media <br /> ads and product 3D renders to UI, web, and app <br />development. Based in Marikina, PH. Remote-ready.</p>
                </div>
                <div className="buttons" data-reveal data-reveal-delay="400">
                    <ViewMyWorkButton />
                    <GetInTouchButton />
                    <DownloadCVButton />
                </div>
                <Rectangle />
            </div>
            <div className="skillsservices">
                <div className="contents">
                    <div className="titlesser" data-reveal>
                        <p className="title">WHAT I DO:</p>
                        <p className="skillz">Skills & Services</p>
                        <p className="des">From concept to final file I handle the full design <br />process across four disciplines.</p>
                    </div>
                    <Rectangle2 />
                </div>
            </div>
            <div id="works" className="portfolio">
                <DotPattern />
                <div className="titlesser" data-reveal>
                    <p className="title">SELECTED WORK</p>
                    <p className="skillz">Portfolio</p>
                    <p className="des">A mix of client work, mock brand projects, and personal exploration <br />across graphic design, 3D, illustration, web, and app development.</p>
                </div>
                <Portfoliocards />
            </div>
            <div id="About">
                <ResumeSection />
            </div>
            <ContactSection />
        </div >
    )
}

export default Homepage
