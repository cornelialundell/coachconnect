import HeroImg from './../../../img/HeroImg.svg';
//FIXA

export const LandingHero = () => {
    return (
        <section className='bg-linear full-height hero'>
        <div className='container-medium row justify-center align-items-center clr-white'>
            <div className="col-6 column">
             <h1>Connect with your clients</h1>
             <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. A aut doloremque, aspernatur consequatur distinctio eos eaque illo doloribus cum hic.</p>
             <a href="/" className='btn'>Get started today</a>
            </div>
            <div className="col-6">
            <img src={HeroImg} />
            </div>
        </div>     
        </section>
    )
}