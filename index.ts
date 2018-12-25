const random = (max: number) => (Math.random() * (max + 1)) | 0

class Square {

  public $element: HTMLDivElement = document.createElement('div')

  constructor(

    public $root: HTMLElement,

    public letter: string,

    public size: number = 100

  ) {

    this.init()

  }

  protected init() {

    Object.assign(this.$element.style, {
      width: `${this.size}px`,
      height: `${this.size}px`,
      position: 'absolute',
      backgroundColor: '#f0ff0f',
      color: '#000',
      cursor: 'pointer',
      textTransform: 'uppercase',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    } as CSSStyleDeclaration)

    this.$element.innerHTML = this.letter

    this.$root.appendChild(this.$element)

  }

  setPos(x: number, y: number) {

    this.$element.style.top = `${y}px`

    this.$element.style.left = `${x}px`

  }

}

class Game {

  public squares: Square[] = []

  public square_size: number = 50

  public timerId?: number

  public width: number = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth

  public height: number = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight

  public $container = document.body

  public alphabet: string = 'qwertyuiopasdfghjklzxcvbnm'

  public get randomLetter(): string {

    const number = random(this.alphabet.length - 1)

    const letter = this.alphabet[number]

    return letter

  }

  public start() {

    this.timerId = setInterval(this.update.bind(this), 500)

    this.init()

  }

  public init() {

    document.addEventListener('keypress', (event) => {

      if (event.defaultPrevented) return;

      const key = event.key || event.keyCode;

      const index = this.squares.findIndex((square) => square.letter === key)

      if (index === -1) { return }

      const square = this.squares[index]

      this.$container.removeChild(square.$element)

      this.squares.splice(index, 1)

    })

  }

  public stop() {

    clearTimeout(this.timerId)
  
  }

  protected update() {

    this.addSquare()

    if (this.squares.length > 10) return this.game_over()

  }

  public game_over() {

    this.stop()

    alert('Game over')

  }


  addSquare(): void {

    const x = random(this.width - this.square_size * 2)

    const y = random(this.height - this.square_size * 2)

    const square = new Square(this.$container, this.randomLetter)

    square.setPos(x, y)

    this.squares.push(square)

  }

}
