/**
 * Список книг
 */
Ext.define('Swan.view.Books', {
	extend: 'Ext.grid.Panel',
	store: {
		proxy: {
			type: 'ajax',
			url: 'index.php/Book/loadList',
			reader: {
				type: 'json',
				idProperty: 'book_id'
			}
		},
		autoLoad: true,
		remoteSort: false,
		sorters: [{
			property: 'book_name',
			direction: 'ASC'
		}]
	},
	defaultListenerScope: true,
	
	tbar: [{
		text: 'Добавить',
		handler: function() {
			//создаем форму
			var AddBookForm=Ext.create('Ext.form.Panel',{
			title: 'Форма для добавления книги',
			width: 500,
			height: 250,
			floating: true,
			closable : true,
			//поля будут типа vbox, выравненные по центру в вертикальной и горизонтальном направлениях  
			layout: {type: 'vbox',
							 align: 'center',
							 pack: 'center'
							 },
			//поля формы для ввода автора, названия и года издания
			items:[{
							xtype: 'textfield',
							fieldLabel: 'Автор',
							name: 'author_book',
							labelAlign: 'left',
							cls: 'field-margin',
							width: 450,
							}, {
							xtype: 'textfield',
							fieldLabel: 'Название',
							name: 'name_book',
							labelAlign: 'left',
							cls: 'field-margin',
							width: 450,
							},{
							xtype: 'textfield',
							fieldLabel: 'Год выпуска',
							name: 'year_book',
							labelAlign: 'left',
							cls: 'field-margin',
							width: 450,
							}],       
			//единственная кнопка будет называться "Сохранить"
			buttons: [{
							text: 'Сохранить',
							handler: function() {
								AddBookForm.getForm().submit({
								url: 'index.php/Book/add_book/',
								success: function(form){
									//создаем объект книги с пустыми полями, будет использован в следующем действии
									var EmptyForm = {
											author_book: '',
											name_book: '',
											year_book: '',
									};
									//Очищаем поля формы
									AddBookForm.getForm().setValues(EmptyForm);	
								},
								failure: function(form){ 
									Ext.MessageBox.alert('При внесении книги в каталог возникла ошибка');
								}
								});
							}
      }],
			});
			//отображаем созданную форму для добавление книги в список
			AddBookForm.show();  
		}
	}, {
		text: 'Редактировать',
		handler: function(btn) {
			//получаем ссылку на таблицу
			var grid = btn.up('grid')
			//получаем объект Ext.selection.Model
			var SelMod = grid.getSelectionModel();
			//получаем массив выделенных записей
			var MasRec = SelMod.getSelection();
			//извлекаем из полученного массива первую запись
			var record = MasRec[0];
			//извлекаем из записи значение полей:  
			var id = record.get('book_id');                //book_id
			var author_name = record.get('author_name');   //author_name
			var book_name = record.get('book_name');       //book_name
			var year_book = record.get('book_year');       //book_year
			// var EditedBook = {
					// author_book: author_name,
					// name_book: book_name,
					// year_book: year_book,
					// };
			//работа с формой для редактирования книги
			var EditBookForm=Ext.create('Ext.form.Panel',{       
			title: 'Форма для редактирования книги',
			width: 500,
			height: 250,
			floating: true,
			closable : true,
			layout: {type: 'vbox',
							 align: 'center',
							 pack: 'center'
							},
			items:[{
							xtype: 'textfield',
							fieldLabel: 'Автор',
							name: 'author_book',
							labelAlign: 'left',
							cls: 'field-margin',
							width: 450,
							}, {
							xtype: 'textfield',
							fieldLabel: 'Название',
							name: 'name_book',
							labelAlign: 'left',
							cls: 'field-margin',
							width: 450,
							},{
							xtype: 'textfield',
							fieldLabel: 'Год выпуска',
							name: 'year_book',
							labelAlign: 'left',
							cls: 'field-margin',
							width: 450,
							}],       
			buttons: [{
							text: 'Сохранить',
							handler: function() {
								EditBookForm.getForm().submit({
									url: 'index.php/Book/edit_book/'+id,
									success: function(form){
										//создаем объект книги с пустыми полями, будет использован в следующем действии
										var EmptyForm = {
												author_book: '',
												name_book: '',
												year_book: '',
										};
										//очищаем поля формы
										EditBookForm.getForm().setValues(EmptyForm);	
									},
									failure: function(form){ 
										Ext.MessageBox.alert('При внесении книги в каталог возникла ошибка');
									}
								});
							}
			}],
			});
			//отображаем созданную форму для добавление книги в список
			EditBookForm.show();
		}
	}, {
		text: 'Удалить',
		handler: function(btn) {
			//получаем ссылку на таблицу
			var grid = btn.up('grid')
			//получаем объект Ext.selection.Model
			var SelMod = grid.getSelectionModel();
			//получаем массив выделенных записей
			var MasRec = SelMod.getSelection();
			//извлекаем из полученного массива первую запись
			var record = MasRec[0];
			//извлекаем из записи значение поля book_id
			var id = record.get('book_id');               
			Ext.Ajax.request({
				url: 'index.php/Book/delete_book/'+id,
			});
			//удаляем запись из таблицы в пердставлении
			grid.getStore().remove(record);
                       
		}
	}, {
		text: 'Экспорт в XML',
		handler: function() {
			Ext.Ajax.request({
				url: 'index.php/Book/save_xml/',
				success: function(){
          Ext.Msg.alert('Успех', 'Все книги выгружены в файл booksxml.xml, находящийся в корневой папке сайта');
				},
				failure: function(){ 
          Ext.MessageBox.alert('Ошибка','Выгрузка книг в xml-файл не удалась');
				}
			});
		}
	}],
	columns: [{
		dataIndex: 'author_name',
		text: 'Автор',
		width: 150
	}, {
		dataIndex: 'book_name',
		text: 'Название книги',
		flex: 1
	}, {
		dataIndex: 'book_year',
		text: 'Год издания',
		width: 150
	}]
});