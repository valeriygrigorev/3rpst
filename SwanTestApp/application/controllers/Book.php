<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Class Book
 * Контроллер для работы с книгами
 */
class Book extends CI_Controller {

		/**
	 * Загрузка списка книг
	 */
	public function loadList()
	{
		$this->load->model('Book_model');
		$bookList = $this->Book_model->loadList();
		echo json_encode($bookList);
	}
	
	/**
	 * Удаление записи книги из списка 
	 */
	public function delete_book($id)
	{
		$this->load->model('Book_model');
		$bookList = $this->Book_model->delete_book($id);
		echo '{"success": true}'; //возврат в ajax запрос отметки об успешности операции
	}
	
	/**
	 * Добавление записи книги в список  
	 */ 
	public function add_book()
	{
		$this->load->model('Book_model');
		$author_name = $_POST['author_book'];
		$book_name = $_POST['name_book'];
		$year = $_POST['year_book'];
		$book_year = $year."-01-01";
		$bookList = $this->Book_model->add_book($author_name, $book_name, $book_year);
		echo '{"success": true}';  //возврат в ajax запрос отметки об успешности операции
	}
	
	/**
	 * Редактирование записи книги в списке 
	 */
	public function edit_book($id)
	{
		$this->load->model('Book_model');
		$author_name = $_POST['author_book'];
		$book_name = $_POST['name_book'];
		$year = $_POST['year_book'];
		$book_year = $year."-01-01";
		$book_id = $id;   
		$bookList = $this->Book_model->edit_book($author_name, $book_name, $book_year, $book_id);
		echo '{"success": true}';  //возврат в ajax запрос отметки об успешности операции
	}
	
	/**
	 * Выгрузка списка книг в xml 
	 */
	public function save_xml()
	{
		$content = '<?xml version="1.0" encoding="UTF-8"?><root></root>';  //первоначальное содержимое xml
		$xml = new SimpleXMLElement($content);  //создаем объект для работы с xml содержимым
		$bookxml = $xml->addChild('books');   //добавляем первый элемент
				
		$this->load->model('Book_model');        //загружаем модель
		$bookList = $this->Book_model->loadList();  //получаем список всех книг из БД 
		foreach ($bookList as $row => $book_record) //проходим по каждой записи                 
		{
			//добавляем в элемент books дочерний элемент book
			$item = $bookxml->addChild('book');                
			//в элемент book добавляем дочерние элементы id, name, author 
			$item->addChild('id', $book_record['book_id']);
			$item->addChild('name', $book_record['book_name']);
			$item->addChild('author', $book_record['author_name']);
		}	
		$xml->asXML('booksxml.xml');   //сохраняем в файл в корневой папке сайта
		echo '{"success": true}';     ////возврат в ajax запрос отметки об успешности операции
	}
}
