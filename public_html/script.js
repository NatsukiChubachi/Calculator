/* グローバルに展開 */
phina.globalize();

/**
 * 計算機
 **/
var console;
phina.define( "Calculater", {
  superClass: 'DisplayScene',  /* 継承 */
  
  /* コンストラクタ */
  init: function() {
    this.superInit();                  /* 親クラス初期化 */
    this.backgroundColor = '#666';     /* 背景 */

    /* ボタンの作成 */
    function createButton( _parent, _posX, _posY, _width, _height, _text, _func ) {
      var _tmp;
      /* グループ */
      var _group = DisplayElement().addChildTo( _parent );
      _group.setPosition( _posX, _posY );
      /* ボタン部分 */
      _tmp = RectangleShape().addChildTo( _group );
      _tmp.setPosition( 0, 0 );
      _tmp.width = _width;
      _tmp.height = _height;
      _tmp.fill = "#fff";
      _tmp.cornerRadius = 0;
      _tmp.setInteractive( true );
      
      _tmp.params = {};
      _tmp.params.scene = _parent;
      _tmp.params.text = _text;
      _tmp.params.func = _func;
      
      _tmp.onpointstart = function() {
        this.params.func( this.params.text );
      };
      /* ボタン文字部分 */
      _tmp = Label().addChildTo( _group );
      _tmp.text = _text;
      _tmp.fontSize = 32;
      _tmp.setPosition( 0, 0 );
      /* 作成したオブジェクトを返す */
      return _tmp;
    }
    
    /* コンソール部分の作成 */
    function createConsole( _parent, _posX, _posY, _width, _height, _text ) {
      var _tmp;
      var _group = DisplayElement().addChildTo( _parent );
      _group.setPosition( _posX, _posY );
      /* 文字コンソール背景 */
      _tmp = RectangleShape().addChildTo( _group );
      _tmp.setPosition( 0, 0 );
      _tmp.width = _width;
      _tmp.height = _height;
      _tmp.fill = "#fff";
      _tmp.cornerRadius = 0;
      _tmp.setInteractive( true );
      /* 文字部分(現在内容) */
      var _tmplblAll = Label().addChildTo( _group );
      _tmplblAll.setPosition( (_width/2)-48, -64 );
      _tmplblAll.width = _width;
      _tmplblAll.height = _height;
      _tmplblAll.text = _text;
      _tmplblAll.fontSize = 64;
      _tmplblAll.align = "right";
      /* 文字部分(入力位置) */
      var _tmplbl = Label().addChildTo( _group );
      _tmplbl.setPosition( (_width/2)-48, (_height/2)-64 );
      _tmplbl.width = _width;
      _tmplbl.height = _height;
      _tmplbl.text = _text;
      _tmplbl.fontSize = 128;
      _tmplbl.align = "right";
      /* パラメータの作成 */
      _group.params = {};
      _group.params.label = _tmplbl;
      _group.params.labelAll = _tmplblAll;
      _group.params.inputText = "";
      _group.params.inputText_A = "";
      _group.params.inputText_B = "";
      _group.params.inputText_C = "";
      _group.params.funcAddText = function( _chr ) {
        
        var lb = this.label;
        var lbAll = this.labelAll;

        switch( _chr ) {
        case '+':
        case '-':
        case '/':
        case '*':
          this.inputText_A = this.inputText;
          this.inputText_B = _chr;
          lb.text = "";
          lbAll.text = this.inputText_A + " " + this.inputText_B + " " + this.inputText_C;
          break;
        case '=':
          this.inputText_C = this.inputText;
          lb.text = "";
          // alert( this.inputText_A );
          // alert( this.inputText_B );
          // alert( this.inputText_C );
          switch( this.inputText_B ) {
          case '+':
            lb.text = Number( this.inputText_A ) + Number( this.inputText_C );
            break;
          case '-':
            lb.text = Number( this.inputText_A ) - Number( this.inputText_C );
            break;
          case '/':
            lb.text = Number( this.inputText_A ) / Number( this.inputText_C );
            break;
          case '*':
            lb.text = Number( this.inputText_A ) * Number( this.inputText_C );
            break;
          }
          
          lbAll.text = this.inputText_A + " " + this.inputText_B + " " + this.inputText_C + " = ";
          
          // this.inputText_A = lb.text;
          this.inputText = lb.text;
          this.inputText_A = "";
          this.inputText_B = "";
          this.inputText_C = "";
          break;
        case '.':
          if ( lb.text.indexOf('hoge') == -1) {
            this.inputText = lb.text + _chr;
            lb.text = this.inputText;
            lbAll.text = this.inputText_A + " " + this.inputText_B + " " + this.inputText_C;
          }
          break;
        default:
          if ( lb.text === "0" ) lb.text = "";
          this.inputText = lb.text + _chr;
          lb.text = this.inputText;
          lbAll.text = this.inputText_A + " " + this.inputText_B + " " + this.inputText_C;
          break;
        }
        
        if ( lb.text === "" ) lb.text = "0";
      };
      
      _group.params.funcClearText = function() {
        this.inputText = "";
        this.inputText_A = "";
        this.inputText_B = "";
        this.inputText_C = "";

        var lb = this.label;
        var lbAll = this.labelAll;
        lb.text = "0";
        lbAll.text = "0";
      }
      
      //_group.params.funcAddText( "A" );
      /* 作成したオブジェクトを返す */
      return _group;
    }
    
    var _numBtnWidth = this.width / 4;
    var _numBtnHeight = _numBtnWidth;
    var _posX = 0 + (_numBtnWidth/2);
    var _posY = this.height - (_numBtnHeight*4) + (_numBtnHeight/2);
    
    var tmp;
    /* コンソールの作成 */
    console = createConsole( this, (this.width/2), (320/2), this.width, 320, "0" );
    var funcAddText = function( _text )
    {
      console.params.funcAddText( _text );
      //console.params.label.text = "aa";
    }
    
    /* テンキーボタンの作成 */
    tmp = createButton( this, _posX+(_numBtnWidth*0), _posY+(_numBtnHeight*0), _numBtnWidth, _numBtnHeight, "7", funcAddText );
    tmp = createButton( this, _posX+(_numBtnWidth*1), _posY+(_numBtnHeight*0), _numBtnWidth, _numBtnHeight, "8", funcAddText );
    tmp = createButton( this, _posX+(_numBtnWidth*2), _posY+(_numBtnHeight*0), _numBtnWidth, _numBtnHeight, "9", funcAddText );
    tmp = createButton( this, _posX+(_numBtnWidth*3), _posY+(_numBtnHeight*0), _numBtnWidth, _numBtnHeight, "/", funcAddText );
    tmp = createButton( this, _posX+(_numBtnWidth*0), _posY+(_numBtnHeight*1), _numBtnWidth, _numBtnHeight, "4", funcAddText );
    tmp = createButton( this, _posX+(_numBtnWidth*1), _posY+(_numBtnHeight*1), _numBtnWidth, _numBtnHeight, "5", funcAddText );
    tmp = createButton( this, _posX+(_numBtnWidth*2), _posY+(_numBtnHeight*1), _numBtnWidth, _numBtnHeight, "6", funcAddText );
    tmp = createButton( this, _posX+(_numBtnWidth*3), _posY+(_numBtnHeight*1), _numBtnWidth, _numBtnHeight, "*", funcAddText );
    tmp = createButton( this, _posX+(_numBtnWidth*0), _posY+(_numBtnHeight*2), _numBtnWidth, _numBtnHeight, "1", funcAddText );
    tmp = createButton( this, _posX+(_numBtnWidth*1), _posY+(_numBtnHeight*2), _numBtnWidth, _numBtnHeight, "2", funcAddText );
    tmp = createButton( this, _posX+(_numBtnWidth*2), _posY+(_numBtnHeight*2), _numBtnWidth, _numBtnHeight, "3", funcAddText );
    tmp = createButton( this, _posX+(_numBtnWidth*3), _posY+(_numBtnHeight*2), _numBtnWidth, _numBtnHeight, "-", funcAddText );
    tmp = createButton( this, _posX+(_numBtnWidth*0), _posY+(_numBtnHeight*3), _numBtnWidth, _numBtnHeight, ".", funcAddText );
    tmp = createButton( this, _posX+(_numBtnWidth*1), _posY+(_numBtnHeight*3), _numBtnWidth, _numBtnHeight, "0", funcAddText );
    tmp = createButton( this, _posX+(_numBtnWidth*2), _posY+(_numBtnHeight*3), _numBtnWidth, _numBtnHeight, "=", funcAddText );
    tmp = createButton( this, _posX+(_numBtnWidth*3), _posY+(_numBtnHeight*3), _numBtnWidth, _numBtnHeight, "+", funcAddText );

    /* 画面タッチによりスプライト位置を変更する */
    this.onpointstart = function( e ) {
      // this._params.sprite.x = e.pointer.x;
      // this._params.sprite.y = e.pointer.y;
    }
    this.onpointmove = function( e ) {
      /* コンソール位置でタッチ操作した場合は内容をクリアする */
      if ( 
        e.pointer.x > 0 && e.pointer.x < this.width &&
        e.pointer.y > 0 && e.pointer.y < 320
      ) {
        console.params.funcClearText();
      }
    }

    /* 内容を初期化する */
    console.params.funcClearText();
  }
});

/**
 * シーン管理用データ
 */
var _myscenes =  [ {
		label: "calc",
		className: "Calculater",
		nextLabel: "main" 
	} ];

/*
 * メイン処理
 */
phina.main(function() {
  /* アプリケーションを生成 */
  var app = GameApp( {
    startLabel: 'calc',   /* 開始画面 */
    scenes: _myscenes     /* シーン情報をセットする */
  } );
  /* fps表示 */
  // app.enableStats();
  /* 実行 */
  app.run();
});
