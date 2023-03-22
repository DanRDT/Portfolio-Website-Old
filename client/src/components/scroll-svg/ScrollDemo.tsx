import { useEffect, useState } from "react"
import scrollSvg from "scroll-svg"

const ScrollDemo = () => {
  const [scrollSVG, setScrollSVG] = useState() as any
  const [activeSvg, setActiveSvg] = useState() as any
  const [options, setOptions] = useState()

  useEffect(() => {
    const svgPath = document.querySelector("#scroll-line-2") as SVGPathElement
    setScrollSVG(scrollSvg(svgPath))
    return () => {
      scrollSVG.stopAnimating()
    }
  }, [])

  useEffect(() => {
    if (activeSvg) {
      setScrollSVG(scrollSvg(activeSvg))
    }
  }, [activeSvg])

  useEffect(() => {
    if (scrollSVG) {
      scrollSVG.changeOptions(options)
    }
  }, [options])

  return (
    <>
      <main>
        <section className='above-svg'>
          <img src='/imgs/scroll-svg/scroll-down.png' alt='Scroll Down' />
        </section>
        <section className='svg-section'>
          <svg className='active' viewBox='0 0 476 927' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              id='scroll-line-2'
              d='M238.458 4C238.458 4 240 28.1667 245 52.5C250 76.8333 276.758 123.7 369.958 160.5C407.458 175.307 455.501 200.5 464.501 258C468.444 283.193 462 334 424 366C390.211 394.454 302.972 416.847 238.458 436C142.458 464.5 121 471.14 65.5 516C46 531.762 18.5001 559 6.99998 605C-1.63757 639.55 11.4091 672 29 693.5C65 737.5 107.235 746.5 147.5 762.5C187.765 778.5 199 786.5 199 786.5C237.5 811 238.458 860.5 238.458 860.5V916.5'
              stroke='url(#paint0_linear_2_3)'
              strokeWidth='8'
              strokeLinecap='round'
            />
            <defs>
              <linearGradient
                id='paint0_linear_2_3'
                x1='199.027'
                y1='-6.29894e-06'
                x2='285.693'
                y2='1203'
                gradientUnits='userSpaceOnUse'>
                <stop stopColor='#F87D37' />
                <stop offset='1' stopColor='#FBAA23' />
              </linearGradient>
            </defs>
          </svg>
        </section>
        <section className='below-svg'>
          <img src='/imgs/scroll-svg/scroll-up.png' alt='Scroll Up' />
        </section>
      </main>
      <aside data-dropdown>
        <div className='aside-btn'>
          <img src='/imgs/scroll-svg/side-arrow.svg' alt='' />
        </div>
        <section className='pick-svg-section'>
          <div tabIndex={0} className='pick-svg-lbl'>
            <h3>Pick Svg</h3>
            <img className='dropdown-arrow' src='/imgs/scroll-svg/dropdown-arrow.svg' alt='' />
          </div>
          <div className='dropdown'>
            <figure tabIndex={0}>
              <img src='/imgs/scroll-svg/svg1.svg' alt='' />
            </figure>
            <figure tabIndex={0}>
              <img src='/imgs/scroll-svg/svg2.svg' alt='' />
            </figure>
            <figure tabIndex={0}>
              <img src='/imgs/scroll-svg/svg3.svg' alt='' />
            </figure>
          </div>
        </section>
        <section className='options-section'>
          <h3 className='options-text'>
            <span className='const'>const</span> <span className='variable'>options</span>&nbsp;&nbsp;=&nbsp;&nbsp;
            <span className='bracket'>{"{"}</span>
          </h3>
          <div className='options-container'>
            <div className='option'>
              <h3 className='options-text'>
                <span className='option-name'>invert</span>:
              </h3>
              <select name='invert' id='invert'>
                <option value='false'>false</option>
                <option value='true'>true</option>
              </select>
              <a href='https://github.com/DanRDT/scroll-svg#invert' target='_blank' rel='noopener noreferrer'>
                <img
                  className='more-info'
                  src='/imgs/scroll-svg/more-info.svg'
                  title='More info about this option'
                  alt='more info'
                />
              </a>
            </div>
            <div className='option'>
              <h3 className='options-text'>
                <span className='option-name'>draw_origin</span>:
              </h3>
              <input type='text' />
              <a href='https://github.com/DanRDT/scroll-svg#draw-origin' target='_blank' rel='noopener noreferrer'>
                <img
                  className='more-info'
                  src='/imgs/scroll-svg/more-info.svg'
                  title='More info about this option'
                  alt='more info'
                />
              </a>
            </div>
            <div className='option'>
              <h3 className='options-text'>
                <span className='option-name'>offset</span>:
              </h3>
              <input type='text' />
              <a href='https://github.com/DanRDT/scroll-svg#offset' target='_blank' rel='noopener noreferrer'>
                <img
                  className='more-info'
                  src='/imgs/scroll-svg/more-info.svg'
                  title='More info about this option'
                  alt='more info'
                />
              </a>
            </div>
            <div className='option'>
              <h3 className='options-text'>
                <span className='option-name'>speed</span>:
              </h3>
              <input type='text' />
              <a href='https://github.com/DanRDT/scroll-svg#speed' target='_blank' rel='noopener noreferrer'>
                <img
                  className='more-info'
                  src='/imgs/scroll-svg/more-info.svg'
                  title='More info about this option'
                  alt='more info'
                />
              </a>
            </div>
            <div className='option'>
              <h3 className='options-text'>
                <span className='option-name'>undraw</span>:
              </h3>
              <select name='undraw' id='undraw'>
                <option value='false'>false</option>
                <option value='true'>true</option>
              </select>
              <a href='https://github.com/DanRDT/scroll-svg#undraw' target='_blank' rel='noopener noreferrer'>
                <img
                  className='more-info'
                  src='/imgs/scroll-svg/more-info.svg'
                  title='More info about this option'
                  alt='more info'
                />
              </a>
            </div>
          </div>
          <h3 className='options-text'>
            <span className='bracket'>{"}"}</span>
          </h3>
        </section>
        <section className='svg-methods'>
          <h3 className='svg-method' onClick={() => scrollSVG.animate()}>
            animate()
          </h3>
          <h3 className='svg-method' onClick={() => scrollSVG.stopAnimating()}>
            stopAnimating()
          </h3>
          <h3 className='svg-method' onClick={() => scrollSVG.clear()}>
            clear()
          </h3>
          <h3 className='svg-method' onClick={() => scrollSVG.fill()}>
            fill()
          </h3>
        </section>
      </aside>
    </>
  )
}

export default ScrollDemo
