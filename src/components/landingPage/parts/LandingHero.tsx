import HeroImg from './../../../img/HeroImg.svg';
//FIXA

export const LandingHero = () => {
    return (
        <section className='bg-linear full-height hero row align-items-center'>
        <div className='container-medium row justify-center align-items-center clr-white phone-direction-row-reverse'>
            <div className="col-6 column justify-center phone-col-12 phone-p-t-6">
             <h1>Connect with your clients</h1>
             <p className='p-t-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. A aut doloremque, aspernatur consequatur distinctio eos eaque illo doloribus cum hic.</p>
             <a href="/register" className='btn'>Get started today</a>
            </div>
            <div className="col-6 phone-col-8 d-none">
            <img src={HeroImg} />
            </div>
        </div>     
        </section>
    )
}