FROM mongo

COPY *.json ./

CMD mongoimport --host mongodb --db energymetrix --collection menus --type json --file ./menus.json --jsonArray && \
    mongoimport --host mongodb --db energymetrix --collection users --type json --file ./users.json --jsonArray && \
    mongoimport --host mongodb --db energymetrix --collection roles --type json --file ./roles.json --jsonArray && \
    mongoimport --host mongodb --db energymetrix --collection zones --type json --file ./zones.json --jsonArray