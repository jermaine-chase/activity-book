package com.itgnomes.WordSearchBuilder

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.http.HttpStatus

@SpringBootTest
class WordSearchBuilderApplicationTests {

	@Autowired
	lateinit var testRestTemplate: TestRestTemplate

	@Test
	fun whenCalled_shouldReturnHello() {
		val result = testRestTemplate.getForEntity("/hello", String::class.java)

		assertNotNull(result)
		assertEquals(result?.statusCode, HttpStatus.OK)
		assertEquals(result?.body, "hello world")
	}

	@Test
	fun contextLoads() {
	}

}
