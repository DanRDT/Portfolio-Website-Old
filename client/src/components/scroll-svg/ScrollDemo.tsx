import { useEffect, useState } from 'react'
import scrollSvg from 'scroll-svg'

const defaultOptions = {
  invert: false,
  draw_origin: 'center',
  offset: 0,
  speed: 1,
  undraw: false,
}
const defaultOptionsInput = {
  invert: 'false',
  draw_origin: 'center',
  offset: '0',
  speed: '1',
  undraw: 'false',
}
// if true then valid input
const defaultOptionsCSS = {
  invert: true,
  draw_origin: true,
  offset: true,
  speed: true,
  undraw: true,
}
Object.freeze(defaultOptions)
Object.freeze(defaultOptionsInput)
Object.freeze(defaultOptionsCSS)

const ScrollDemo = () => {
  const [scrollSVG, setScrollSVG] = useState() as any
  const [activeSvg, setActiveSvg] = useState() as any
  const [pickSvgDropdown, setPickSvgDropdown] = useState('')
  const [pickableSvgs, setPickableSvgs] = useState({
    'scroll-line-1': '',
    'scroll-line-2': 'active',
    'scroll-line-3': '',
    'scroll-line-4': '',
  })
  //used for options real values
  const [options, setOptions] = useState(defaultOptions)
  // used for controlled inputs
  const [optionsInput, setOptionsInput] = useState(defaultOptionsInput)
  // used for css to show whether option input is valid or not
  const [optionsCSS, setOptionsCSS] = useState(defaultOptionsCSS)

  // setup default active svg
  useEffect(() => {
    const svgPath = document.querySelector('#scroll-line-2') as SVGPathElement
    setActiveSvg(svgPath)
    return () => {
      scrollSVG.stopAnimating()
    }
  }, [])

  // change ScrollSVG to the active svg
  useEffect(() => {
    if (activeSvg) {
      setScrollSVG(scrollSvg(activeSvg))
      setPickableSvgs(prev => {
        return {
          'scroll-line-1': '',
          'scroll-line-2': '',
          'scroll-line-3': '',
          'scroll-line-4': '',
          [activeSvg.id]: 'active',
        }
      })
    }
  }, [activeSvg])

  // update options
  useEffect(() => {
    if (scrollSVG) {
      scrollSVG.changeOptions(options)
    }
  }, [options])

  // takes svg path id, sets svg as active, and resets options
  function changeSvg(svgId: string): void {
    const svgPath = document.querySelector(svgId) as SVGPathElement
    scrollSVG.stopAnimating()
    setOptions(defaultOptions)
    setOptionsInput(defaultOptionsInput)
    setOptionsCSS(defaultOptionsCSS)
    setActiveSvg(svgPath)
    setPickSvgDropdown('')
  }

  function changeOptions(key: string, inputValue: string): void {
    // update controlled input
    setOptionsInput(prev => {
      return {
        ...prev,
        [key]: inputValue,
      }
    })

    const value = getParsedValue(key, inputValue)
    // update css for input
    checkInput(key, inputValue)

    setOptions(prev => {
      return {
        ...prev,
        [key]: value,
      }
    })
  }

  function checkInput(key: string, value: string): void {
    if (key === 'invert' || key === 'undraw') {
      if (value !== 'true' && value !== 'false') updateOptionsCSS(key, false)
      else updateOptionsCSS(key, true)
    } else if (key === 'draw_origin') {
      if (value === 'center' || value === 'top' || value === 'bottom') updateOptionsCSS(key, true)
      else if (!isNaN(Number(value))) {
        if (Number(value) >= 0 && Number(value) <= 1) updateOptionsCSS(key, true)
        else updateOptionsCSS(key, false)
      } else updateOptionsCSS(key, false)
    } else if (key === 'offset') {
      if (!isNaN(Number(value))) updateOptionsCSS(key, true)
      else updateOptionsCSS(key, false)
    } else if (key === 'speed') {
      if (!isNaN(Number(value)) && Number(value) > 0) updateOptionsCSS(key, true)
      else updateOptionsCSS(key, false)
    }
    if (value === '' || value === ' ' || value === '  ' || value === '   ') updateOptionsCSS(key, false)
  }

  function updateOptionsCSS(key: string, value: boolean) {
    setOptionsCSS(prev => {
      return {
        ...prev,
        [key]: value,
      }
    })
  }

  useEffect(() => {
    // close and open svg dropdown
    const dropdown = (e: Event) => {
      const isDropdown = (e.target as HTMLElement).closest('.pick-svg-lbl')
      if (isDropdown === null) {
        setPickSvgDropdown('')
      } else {
        setPickSvgDropdown('active')
      }
    }
    window.addEventListener('click', dropdown)

    return () => {
      window.removeEventListener('click', dropdown)
    }
  }, [])

  return (
    <>
      <main>
        <section className='above-svg'>
          <img src='/imgs/scroll-svg/scroll-down.png' alt='Scroll Down' />
        </section>
        <section className='svg-section'>
          <svg className={pickableSvgs['scroll-line-1']} viewBox='0 0 9 699' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              id='scroll-line-1'
              d='M 5 4 V 694.5'
              stroke='url(#paint0_linear_102_3)'
              strokeWidth='8'
              strokeLinecap='round'
            />
            <defs>
              <linearGradient
                id='paint0_linear_102_3'
                x1='-33.4736'
                y1='-33.5001'
                x2='53.1928'
                y2='1169.5'
                gradientUnits='userSpaceOnUse'>
                <stop stopColor='#F87D37' />
                <stop offset='1' stopColor='#FBAA23' />
              </linearGradient>
            </defs>
          </svg>
          <svg
            className={pickableSvgs['scroll-line-2']}
            viewBox='0 0 476 927'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
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
          <svg
            className={pickableSvgs['scroll-line-3']}
            viewBox='0 0 343 637'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              id='scroll-line-3'
              d='M178.458 0.5V142H339V292.5H4.5V462H178.458V636.5'
              stroke='url(#paint0_linear_2_3)'
              strokeWidth='8'
            />
            <defs>
              <linearGradient
                id='paint0_linear_2_3'
                x1='140.026'
                y1='-37.0001'
                x2='226.693'
                y2='1166'
                gradientUnits='userSpaceOnUse'>
                <stop stopColor='#F87D37' />
                <stop offset='1' stopColor='#FBAA23' />
              </linearGradient>
            </defs>
          </svg>
          <svg
            className={pickableSvgs['scroll-line-4']}
            viewBox='0 0 580 768'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              id='scroll-line-4'
              d='M485 4C485 4 527.352 194.119 450.5 198C402.3 200.434 363.35 173.579 349 127.5C326.705 55.9107 486.991 75.489 541 127.5C602.046 186.288 574.694 278.76 520 343.5C458.222 416.625 368.715 417.516 278.5 385.5C234.403 369.851 217.742 350.5 221.5 329.5C230 282 278.5 277.5 321.5 312C393.382 369.673 297.5 528 264.5 541C231.5 554 153.06 582.198 91 554.5C48.4871 535.526 4.00004 513.5 4 473C3.99996 432.5 114.84 430.22 166 467.5C247.063 526.57 126.835 625.223 63.5 703C42.4871 728.804 4 764 4 764'
              stroke='url(#paint0_radial_104_5)'
              strokeWidth='8'
              strokeLinecap='round'
            />
            <defs>
              <radialGradient
                id='paint0_radial_104_5'
                cx='0'
                cy='0'
                r='1'
                gradientUnits='userSpaceOnUse'
                gradientTransform='translate(465 147.5) rotate(124.873) scale(806.29 606.555)'>
                <stop stopColor='#F87D37' />
                <stop offset='1' stopColor='#FBAA23' />
              </radialGradient>
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
        <section className={`pick-svg-section ${pickSvgDropdown}`}>
          <div tabIndex={0} className='pick-svg-lbl'>
            <h3>Pick Svg</h3>
            <img className='dropdown-arrow' src='/imgs/scroll-svg/dropdown-arrow.svg' alt='' />
          </div>
          <div className='dropdown'>
            <figure onClick={() => changeSvg('#scroll-line-1')} tabIndex={0}>
              <img src='/imgs/scroll-svg/svg1.svg' alt='' />
            </figure>
            <figure onClick={() => changeSvg('#scroll-line-2')} tabIndex={0}>
              <img src='/imgs/scroll-svg/svg2.svg' alt='' />
            </figure>
            <figure onClick={() => changeSvg('#scroll-line-3')} tabIndex={0}>
              <img src='/imgs/scroll-svg/svg3.svg' alt='' />
            </figure>
            <figure onClick={() => changeSvg('#scroll-line-4')} tabIndex={0}>
              <img src='/imgs/scroll-svg/svg4.svg' alt='' />
            </figure>
          </div>
        </section>
        <section className='options-section'>
          <h3 className='options-text'>
            <span className='const'>const</span> <span className='variable'>options</span>&nbsp;&nbsp;=&nbsp;&nbsp;
            <span className='bracket'>{'{'}</span>
          </h3>
          <div className='options-container'>
            <div className={`option ${optionsCSS.invert}`}>
              <h3 className='options-text'>
                <span className='option-name'>invert</span>:
              </h3>
              <select
                onChange={e => {
                  changeOptions(e.target.name, e.target.value)
                }}
                value={optionsInput.invert}
                name='invert'>
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
            <div className={`option ${optionsCSS.draw_origin}`}>
              <h3 className='options-text'>
                <span className='option-name'>draw_origin</span>:
              </h3>
              <input
                onChange={e => {
                  changeOptions(e.target.name, e.target.value)
                }}
                value={optionsInput.draw_origin}
                name='draw_origin'
                type='text'
              />
              <a href='https://github.com/DanRDT/scroll-svg#draw-origin' target='_blank' rel='noopener noreferrer'>
                <img
                  className='more-info'
                  src='/imgs/scroll-svg/more-info.svg'
                  title='More info about this option'
                  alt='more info'
                />
              </a>
            </div>
            <div className={`option ${optionsCSS.offset}`}>
              <h3 className='options-text'>
                <span className='option-name'>offset</span>:
              </h3>
              <input
                value={optionsInput.offset}
                onChange={e => {
                  changeOptions(e.target.name, e.target.value)
                }}
                type='text'
                name='offset'
              />
              <a href='https://github.com/DanRDT/scroll-svg#offset' target='_blank' rel='noopener noreferrer'>
                <img
                  className='more-info'
                  src='/imgs/scroll-svg/more-info.svg'
                  title='More info about this option'
                  alt='more info'
                />
              </a>
            </div>
            <div className={`option ${optionsCSS.speed}`}>
              <h3 className='options-text'>
                <span className='option-name'>speed</span>:
              </h3>
              <input
                onChange={e => {
                  changeOptions(e.target.name, e.target.value)
                }}
                value={optionsInput.speed}
                name='speed'
                type='text'
              />
              <a href='https://github.com/DanRDT/scroll-svg#speed' target='_blank' rel='noopener noreferrer'>
                <img
                  className='more-info'
                  src='/imgs/scroll-svg/more-info.svg'
                  title='More info about this option'
                  alt='more info'
                />
              </a>
            </div>
            <div className={`option ${optionsCSS.undraw}`}>
              <h3 className='options-text'>
                <span className='option-name'>undraw</span>:
              </h3>
              <select
                onChange={e => {
                  changeOptions(e.target.name, e.target.value)
                }}
                value={optionsInput.undraw}
                name='undraw'>
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
            <span className='bracket'>{'}'}</span>
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

function getParsedValue(key: string, value: string): boolean | number | string {
  if (key === 'invert' || key === 'undraw') {
    if (value === 'true') return true
    else return false
  } else if (key === 'draw_origin') {
    if (isNaN(Number(value))) return value
    else return Number(value)
  } else if (key === 'offset' || key === 'speed') return Number(value)
  else return value
}

export default ScrollDemo
