import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import kotlin.random.Random

/**wordsearch.kt
 * A small java program that works as a basic word search generator.
 * Takes in words to be 'hidden' creates and fills array with the words
 * and a mix of random characters to make them harder to find.
 *
 * @author JChase.
 **/
@RestController
class WordSearchBuilder() {
    var width: Int = 0
    var length: Int = 0
    var wordCount: Int = 0
    var words = arrayListOf<String>()
    var badWords = listOf("arse", "ass", "asshole", "bastard", "bitch", "bollocks", "bugger", "crap", "cunt", "damn", "effing", "frigger", "fuck", "hell", "holy shit", "horseshit", "motherfucker", "nigga", "nigger", "prick", "shit", "slut", "twat", "whore")
    var positions = arrayListOf<Int>()
    var search = arrayListOf<Array<Char>>()
    var input: String = ""
    var toUpperCase: Boolean = false
    /** counter for errors **/
    var errorCount: Int = 0

    /**
     * Prints the finished word search and related information
     */
    fun printVertical() {
        for (list in search) {
            for (entry in list) {
                println("$entry ")
            }
            println(" ")
        }
        println("""done
            |$width     Lines deep
            |$length    Lines wide
            |Find these words""".trimMargin())
    }

    /**
     * Prints output to html page and saves.
     */
    fun printHtml():String {
        var response = ""

        val tableWidth = 20.4 * width
        var outputHtml: String? = ""
        val htmlStart = """<html lang="en">
                |<head>
                |   <title>WordSearch</title>
                |   <style>
                |       tr {text-align: center; }
                |       .myTd {text-align: left; }
                |   </style>
                |</head>
                |<body>
                |   <p style="text-align: center; width:  $tableWidth px; font-size: 3em;">Word Search</p>
                |   <table style="width: $tableWidth px">""".trimMargin()
        val htmlEnd = """   </table><br/><br/><br/>
                |   <p style="text-align: center; width: $tableWidth;">Did you find any other words? Write them below</p><br/><br/><br/><br/><br/><br/>
                |</body>
                |</html>""".trimMargin()
        // generate crossword grid
        // generate crossword grid
        outputHtml += htmlStart

        for (i in 0 until width) {
            outputHtml += """|          <tr>""".trimMargin()
            for (ind in 0 until length) {
                outputHtml += """|              <td>$search[i][ind].toString()</td>""".trimMargin()
            }
            outputHtml += """|          </tr>""".trimMargin()
        }

        // generate word list
        // generate word list
        outputHtml += """</table><br/><br/>
                |<table style="width: $tableWidth px"><tr>""".trimMargin()
        outputHtml += "<td style=\"width: $tableWidth/10 px\"></td>"
        for (i in 0 until wordCount) {
            if (i % (wordCount / 3) == 0) {
                outputHtml += "<td class=\"myTd\">"
            }
            outputHtml += words[i] + "<br/>"
            if (i % (wordCount / 3) == wordCount / 3 - 1 || i == wordCount - 1) {
                outputHtml += "</td>"
            }
        }
        outputHtml += "<td style=\"width: $tableWidth/10 px\"></td>"
        outputHtml += "</tr>$htmlEnd"

        return response
    }

    /**
     * Creates the wordsearch by calling other methods
     */
    @GetMapping("/GetWordSearch")
    fun run(@RequestParam(value = "width") width: String, @RequestParam(value = "length") length: String,
            @RequestParam(value = "words") words: String): String {
        println("""Welcome to the word search generator
            |This simple java program will create a word search based on words you choose""".trimMargin())
        this.width = width?.toInt()
        this.length = length?.toInt()
        this.words = words?.split(",") as ArrayList<String>
        this.wordCount = this.words.size
        measurements()
        fill()
        return printHtml()
    }

    /**
     * Fills up the search array, applies the inputted words, and
     * randomly generates the rest of the characters.
     */
    private fun fill() {
        var between: Int
        var strlen: Int
        var x: Int
        var y: Int
        var index: Int = 0
        positions = arrayListOf<Int>(this.wordCount)

        for (word: String in words) {
            strlen = word.length
            between = width - strlen
            x = Random.nextInt(0, between)
            y = Random.nextInt(0, length - 5)
            if (search(positions, y)) {
                y++
            }
            positions[index] = y
            var idx: Int = 0
            while (idx < strlen) { //for each letter in the word
                search[x][y] = words[index].get(idx) //put char into the search array
                x++
                idx++
            }
            index++
        }

        //fill empty slots
        var idx = 0
        while (idx < length) {
            var i = 0
            while (i < width) {
                val t: Char = Random.nextInt(97, 122).toChar()
                search[idx][i] = t
                i++
            }
            idx++
        }
    }//end of method

    /**
     * @param Int array, Int key.
     *
     * @return boolean. searches array for the key. returns true if key is in array.
     */

    fun search(numbers: ArrayList<Int>, key: Int): Boolean {
       for (value in numbers) {
            if (value == key) {
               return true //found it!
           }
        }
        return false
    }

    /**
     * Calculates size of the char array the word search uses.
     */
    fun measurements() {
        println("generating word search")
        for (word: String in words) {
            if (word.length > width) {
                width = word.length
            }
        }
        width *= 2
        length = width + (width / 3)
        search = arrayListOf<Array<Char>>()
    }
}