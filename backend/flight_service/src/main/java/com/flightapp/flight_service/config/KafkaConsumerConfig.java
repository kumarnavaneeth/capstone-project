package com.flightapp.flight_service.config;

import java.util.HashMap;
import java.util.Map;

import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.serializer.JsonDeserializer;

import com.flightapp.flight_service.dto.BookingEvent;

@Configuration
@EnableKafka
public class KafkaConsumerConfig {
	@Bean
	public ConsumerFactory<String, BookingEvent> consumerFactory() {
		JsonDeserializer<BookingEvent> deserializer = new JsonDeserializer<>(BookingEvent.class);
		deserializer.addTrustedPackages("*");
		Map<String, Object> props = new HashMap<>();
		props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "127.0.0.1:9092");
		props.put(ConsumerConfig.GROUP_ID_CONFIG, "flight-group");
		return new DefaultKafkaConsumerFactory<>(props, new StringDeserializer(), deserializer);
	}

	@Bean
	public ConcurrentKafkaListenerContainerFactory<String, BookingEvent> kafkaListenerContainerFactory() {
		ConcurrentKafkaListenerContainerFactory<String, BookingEvent> factory = new ConcurrentKafkaListenerContainerFactory<>();
		factory.setConsumerFactory(consumerFactory());
		return factory;
	}
}