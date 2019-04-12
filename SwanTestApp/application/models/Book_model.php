<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Class Book_model
 * Модель для работы с книгами
 */
class Book_model extends CI_Model {

	/**
	 * 
	 * Загрузка базы данных
	 */
 
	public function __construct()
	{
		$this->load->database();
	}
	
	/**
	 * Загрузка списка книг
	 */
	public function loadList()
	{
		//получаем все записи из базы данных
		$query = $this->db->get('cataloge');                     
		$arrayDate  = $query->result_array();
		//для каждой записи
		foreach ($arrayDate as $row => &$book_item)                
		{
			$book_item['book_year'] = substr($book_item['book_year'], 0, 4);  //выразаем из даты год, т.е. извлекаем подстроку в 4 символа начиная с первого(нулевой эл-т массива)
		}	
		return $arrayDate;	
	}
	/**
	 * Удаление запись в таблице cataloge по ее идентификатору id	
	 */
	public function delete_book($id)
	{
		$this->db->delete('cataloge', array('book_id' => $id));
	}
	
	/**
	 * Добавление записи книги в список  
	 */
	public function add_book($author_name, $book_name, $book_year)
	{
		$sql = 'INSERT INTO cataloge (book_id, author_name, book_name, book_year) VALUES (?, ?, ?, ?)';   
		$book_array = array($id=0, $author_name, $book_name, $book_year);         
		$this->db->query($sql, $book_array);
	}
	
	/**
	 * Редактирование записи книги в списке 
	 */
		public function edit_book($author_name, $book_name, $book_year, $book_id)
	{
		$sql = 'UPDATE cataloge SET author_name = ?, book_name = ?, book_year = ? WHERE book_id = ?';     
		$book_array = array($author_name, $book_name, $book_year, $book_id);       
		$this->db->query($sql, $book_array);
	}
}
