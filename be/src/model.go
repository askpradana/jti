package src

type FormData struct {
	Phone    string `json:"noPhone"`
	Provider string `json:"provider"`
}

type FormDataDelete struct {
	ID string `json:"id"`
}

type FormDataGET struct {
	ID       string `json:"id"`
	Phone    string `json:"noPhone"`
	Provider string `json:"provider"`
}

type FormDataEDIT struct {
	ID       string `json:"id"`
	Phone    string `json:"noPhone"`
	Provider string `json:"provider"`
}
