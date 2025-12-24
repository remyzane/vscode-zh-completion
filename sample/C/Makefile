# C语言中文编程样例 Makefile

CC = gcc
CFLAGS = -Wall -Wextra -std=c99
TARGET = main
SOURCES = main.c 中文包/中文模块.c
HEADERS = 中文包/中文模块.h
OBJECTS = $(SOURCES:.c=.o)

all: $(TARGET)

$(TARGET): $(OBJECTS)
	$(CC) $(CFLAGS) -o $(TARGET) $(OBJECTS)

%.o: %.c $(HEADERS)
	$(CC) $(CFLAGS) -c $< -o $@

clean:
	rm -f $(OBJECTS) $(TARGET)

run: $(TARGET)
	./$(TARGET)

.PHONY: all clean run