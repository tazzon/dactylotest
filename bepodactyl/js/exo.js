var titre = new Array();
var conseil = new Array();
var exo = new Array();
var conseils = new Array();
var lettres = new Array();

titre[0]=[];
titre[1]=[];
lettres[0]=[];
lettres[1]=[];
exo[0]=[];
exo[1]=[];

/*
bepo v1.0 => index=0
bepo v1.1 => index=1
ex: 
exo[index_bepo][num_exercice]
*/

conseils[0]="";
conseils[1]="Pour frapper les majuscules, utilisez l’auriculaire de la main opposée à celle qui tape la lettre. Ainsi, on doit utiliser l’auriculaire droit pour les majuscules AUIE et l’auriculaire gauche pour NRST.";
conseils[2]="Pour le M et le Z, l’auriculaire droit doit s’étendre hors de sa colonne. La virgule et le È doivent être faits avec l’index gauche.";
conseils[3]="Le K et le point se font avec la main gauche. L’apostrophe et le Q se font avec la main droite. L’apostrophe nécessite d’étirer un peu plus l’index. Attention à ne pas confondre les deux ! Le principe est toujours le même : la précision est bien plus importante que la rapidité.";
conseils[4]="Attention, c’est bien l’annulaire gauche qui doit être utilisé pour faire le « Y » !";
conseils[5]="L’accent circonflexe (en dessous du point d’exclamation) et le tréma (en AltGr+I) doivent être tapés seuls. Vous ne verrez rien, mais l’accent apparaîtra sur la voyelle tapée ensuite. Une subtilité pour Ê, qui peut être obtenu de deux façons : par la 105e touche du clavier Ê, ou avec l’accent circonflexe, puis le E.";
conseils[6]="Une petite difficulté supplémentaire pour les deux points qui doivent être précédés d'une espace insécable et le point-virgule, le point d’exclamation et le point d’interrogation qui doivent tous être précédés d’une espace insécable fine (représentée ici par <span style=\"background-color:#aaa\"> </span> pour l'insécable et <span style=\"background-color:#ccc\"> </span> pour la fine insécable). Ces deux espaces sont obtenues avec la barre espace en shitf+espace ou shift+altGr+espace (selon votre version du BÉPO). Conservez ensuite la touche shift appuyée pour la frappe du signe de ponctuation, qui est justement en shift lui aussi. Ne pas oublier de relâcher avant la frappe de l’espace suivante.";
conseils[7]="Une petite difficulté supplémentaire pour les guillemets ouverts qui doivent être suivis d’une espace fine insécable (représentée ici par <span style=\"background-color:#ccc\"> </span>), ainsi que pour les guillemets fermés qui doivent être précédés d’une espace fine insécable, obtenue en maintenant shift ou shift+altGr (selon votre version du BÉPO) durant la frappe de l’espace.";
conseils[8]="En guise de conclusion, voici des exercices où, à chaque ligne, on trouve toutes les lettres de l’alphabet : des pangrammes.";


  titre[0][0]="E, T, A, N (index et auriculaires)";
  titre[1][0]=titre[0][0];
lettres[0][0]="etanETAN";
lettres[1][0]=lettres[0][0];
    exo[0][0]="et et et et et et et te te te te te te te###tee tee ette ette et et teet###an an an an an an an na na na na na na na###anna nana anan anna nana anan###en en en en ta ta ta ta ta ne ne ne ne ne###ane tate tante nana tata tete###tata et annette tannent ta tante###natte tentante et tente attenante###annette et tata tentent attentat en tente";
    exo[1][0]=exo[0][0];

conseil[0]=0;

  titre[0][1]="I et S (majeurs)";
  titre[1][1]=titre[0][1];
lettres[0][1]="isIS";
lettres[1][1]=lettres[0][1];
    exo[0][1]="ss ii ss ii si si si is is is###isis et sissi sises###tes siestes et ses tasses###titi sieste et sissi tisse###sainte anne atteint ses antiennes###annette assiste insiste et atteste###satan est sienne si ta tante se tait###tante annette insistait et teintait sa tisane###sissi nantaise et titi sataniste naissent nantis###ni ses antennes ni ses tasses ne tentaient sa tante###annie est assise et anais a ses assiettes et ses tasses###anastasie tissait sa taie en satin et anne assistait assise en se taisant";
    exo[1][1]=exo[0][1];

conseil[1]=0;

  titre[0][2]="U et R (annulaires)";
  titre[1][2]=titre[0][2];
lettres[0][2]="urUR";
lettres[1][2]=lettres[0][2];
    exo[0][2]="ur ur ur ru ru ru###rue rue rue eur eur eur eur###sanie sur un nanti est inane###sirius statue et nina sursaute###tu attises sans tester tes risettes###un narrateur rit et renie sa nature###tu essaies un instant et tu es saisi###tu eus une transe et tu te ratatinas###un statut saint unirait ses instituts###une eau saine et sans nitrates rassure###ses saisies insanes initient sa retraite###une instit tunisienne se tait en entrant###nina ruse et ne susurre rien au russe assis###un interne ruant sur rue ne saurait user sa rate###un artiste teint ses tartines et rature ses raies###en ratissant sa teinturerie sirius sent sa nature inerte###un assaut retentissant terrassa un tsar et instaura une terreur###un raisin rassis sustenterait un sarrasin sinistre et une tunisienne nantie en nuisette";
    exo[1][2]=exo[0][2];

conseil[2]=0;

  titre[0][3]="V et O (index)";
  titre[1][3]=titre[0][3];
lettres[0][3]="voVO";
lettres[1][3]=lettres[0][3];
    exo[0][3]="vo vo vo ov ov ov###Nous envions votre aviation souveraine###Un toit en soie sur une tasse toute neuve###Un virtuose novateur et avenant renversait nos vies###Nous arriverons vers Tours via une autoroute toute neuve###Un visionnaire vivote et entrevoit un tournevis novateur###Nous savonnerons notre ventouse et retournerons notre veste###Une voisine a vu un avion en ivoire et une voiture innovante###Nous arriverons en vitesse et nous nous enivrerons en vos vins###On va vers une aventure vaseuse si on avoue avoir vu son invention";
    exo[1][3]=exo[0][3];

conseil[3]=1;

  titre[0][4]="P et D (majeurs)";
  titre[1][4]=titre[0][1];
lettres[0][4]="pdPD";
lettres[1][4]=lettres[0][4];
    exo[0][4]="Nous nous disputons pour des prunes###Un papa panda divin parade au paradis###Nous parviendrons en Inde avant votre venue###Nous adoptons votre point de vue sur notre patriote###Un artiste peintre en peine a perdu de vue son inspiration###Un oiseau de proie est souvent suspendu au dessus de terre###Nous adoptons une attitude positive et nions avoir pris du poids###Votre titre de transport apatride vous sera repris avant de sortir de notre avion###Nous avons pour ainsi dire perdu notre inspiration et repoussons notre dispensaire";
    exo[1][4]=exo[0][4];

conseil[4]=0;

  titre[0][5]="É et L (annulaires)";
  titre[1][5]=titre[0][5];
lettres[0][5]="élÉL";
lettres[1][5]=lettres[0][5];
    exo[0][5]="Ils étaient pourtant anéantis###Le ré et le la ont été entendus###Il a idéalisé son idole antirévolutionnaire###Un oiseau a des ailes et en réalité les avions aussi###Une eau désaltérante est la plus utile durant un été étoilé###Les dépolluants ont évolué et peuvent délivrer une eau saine###Nous avons pu altérer les évolutions prévues de notre Étoile en étain###Le député et le président ont été élus suite au vote sans surprise de la droite###Alerté par la radio un adulte daltonien a pu délivrer le latéral droit de Lens###Une révolutionnaire esseulée est délaissée par les prisonniers dépassés par la situation";
    exo[1][5]=exo[0][5];

conseil[5]=0;

  titre[0][6]="B et J (auriculaires), C (index droit)";
  titre[1][6]=titre[0][6];
lettres[0][6]="bjBJcC";
lettres[1][6]=lettres[0][6];
    exo[0][6]="Je blablate beaucoup du jubilé de Platini###Je jubile devant une bien belle bijouterie###Je vous dis bienvenue dans le Libre via bépo###Bien entendu je vais juste jouer au jeune toubib###Nous balisons les jalons des joutes de javelot et de bouée###Bébé a avalé son jus de baies puis a beaucoup bavé###Le barbu a brutalisé un juré et la réponse du tribunal était terrible###Un bretteur battu a troublé les badauds obnubilés par son adresse au sabre###Jules abjura les jeunes et éblouit ses subordonnés débordants de jalousie";
    exo[1][6]=exo[0][6];

conseil[6]=0;

  titre[0][7]=", et È (index gauche), M et Z (auriculaire droit)";
  titre[1][7]=titre[0][7];
lettres[0][7]=",èÈmzMZ";
lettres[1][7]=lettres[0][7];
    exo[0][7]="Le combat semble impossible, mais le succès demeurera une victoire intemporelle###Zou, il est temps de partir###Bleu, comme le ciel azuréen###La moutarde lui monte au nez###Vous devez votre ceinture abdominale###Un nez, un pic, un cap, une péninsule###Un zombie disparu et tout est dépeuplé###Libérez ce prisonnier insolent et malade###Vous entamez cette procédure très attentivement###Vous acclamerez sans problème ces émois juvéniles###Une émeute a éclaté, mais vous avez amnistié les meneurs###En Amazonie, les amateurs de meubles en acajou se réjouissent###Justement, vous pouvez ajuster cet alambic avec votre nez###Vous vous débarrassez de cet animal empaillé dont le nez empestait###Entre zèbres et zébus, la Zambie demeure accueillante###Treize litres de mazout déversés dans la mer, et le vizir est alarmé###Vous lézardez au son de cet air de jazz###Vous venez de commander votre seizième pizza, elle sera très moelleuse###Ce zélote zozote mais reste zen en zippant son blouson###Les trapézistes volent, une dizaine de zèbres parcourent la piste, et douze lézards ramassent les restes";
    exo[1][7]=exo[0][7];

conseil[7]=2;

  titre[0][8]="Ç et W";
  titre[1][8]=titre[0][8];
lettres[0][8]="çwÇW";
lettres[1][8]=lettres[0][8];
    exo[0][8]="Les edelweiss poussent en altitude###Lawrence est un darwiniste convaincu###Le journaliste a interviewé le steward wallon###Avec une jupe en tweed et un sweat, je suis parée pour assister au spectacle de clowns###En ensemençant maintenant, nous aurons un beau jardin au printemps###La rançon demandée est désarçonnante###Il passait inaperçu et demeurait donc insoupçonnable###Nous vous avons aperçus puis reçus, comme ça, sans attendre###Le caleçon du maçon se coinça dans un escalier en colimaçon mal conçu, alors il menaça de poinçonner son remplaçant déçu###Elle a conçu un brownie tout simplement sublime###Dans ce western, les cavaliers sont souvent désarçonnés";
    exo[1][8]=exo[0][8];

conseil[8]=0;

  titre[0][9]="K . ' et Q (index)";
  titre[1][9]="K . ’ et Q (index)";
lettres[0][9]="kK.'qQ";
lettres[1][9]="kK.’qQ";
    exo[0][9]="J'ai la joie d'utiliser un point.###L'accueil d'une douzaine d'émirs est crucial.###Il s'est présenté tel quel.###Je joue tandis qu'il travaille.###L'aéronautique est souvent critiquée mais demeure un domaine de compétence.###Un enquiquineur de première classe.###Je viens d'acquérir un kiwi.###C'est anecdotique, mais l'acoustique de cette salle est remarquable.###Il a empaqueté son anorak et l'a embarqué pour Astrakan.###Après le cours de karaté, un bon cake te requinquera.###Le judoka qui est en kaki teste ton kaléidoscope.###Un cocktail suivra la kermesse. Les basketteurs seront présents, ainsi que les quelques rockeurs.###Après quelques vodkas, je serai partant pour un jerk et un rock endiablés.###J'ai acquis une belle aquarelle d'antiquaire, que je mettrai près de mon aquarium.###C'est dans la zone équatoriale que j'ai pu pratiquer l'équitation.###Cet ecclésiastique éloquent évoquait une escroquerie sans équivoque.###Je m'inquiète de ce qu'impliquent ces quatorze quatrains.";
    exo[1][9]=exo[0][9].replace(/'/g,"’");
    //exo[1][9]="J’ai la joie d’utiliser un point.###L’accueil d’une douzaine d’émirs est crucial.###Il s’est présenté tel quel.###Je joue tandis qu’il travaille.###L’aéronautique est souvent critiquée mais demeure un domaine de compétence.###Un enquiquineur de première classe.###Je viens d’acquérir un kiwi.###C’est anecdotique, mais l’acoustique de cette salle est remarquable.###Il a empaqueté son anorak et l’a embarqué pour Astrakan.###Après le cours de karaté, un bon cake te requinquera.###Le judoka qui est en kaki teste ton kaléidoscope.###Un cocktail suivra la kermesse. Les basketteurs seront présents, ainsi que les quelques rockeurs.###Après quelques vodkas, je serai partant pour un jerk et un rock endiablés.###J’ai acquis une belle aquarelle d’antiquaire, que je mettrai près de mon aquarium.###C’est dans la zone équatoriale que j’ai pu pratiquer l’équitation.###Cet ecclésiastique éloquent évoquait une escroquerie sans équivoque.###Je m’inquiète de ce qu’impliquent ces quatorze quatrains.";;

conseil[9]=3;

  titre[0][10]="X et G (majeurs)";
  titre[1][10]=titre[0][10];
lettres[0][10]="xgXG";
lettres[1][10]=lettres[0][10];
    exo[0][10]="J'exagère sans doute, mais l'état de mon gazon s'aggrave.###Les Anglais s'agglutinent dans cette agglomération.###Lorsqu'elle angoisse, elle ingurgite et engloutit des quantités astronomiques.###Nous avons obtenu l'agrément pour l'agrandissement de notre maison et l'aménagement de l'annexe.###L'agence nous a conseillé l'agriculture, mais l'élevage de grenouilles pourrait nous nuire.###Le matin, on conseille un bon verre de jus d'orange ou de tout autre agrume.###La gourmandise n'aide pas pour maigrir.###J'enrage car l'enregistrement que j'avais programmé a raté.###Mon garçon est ambidextre.###Avec mes index et mes majeurs, j'indexe des données qui avaient été annexées.";
    exo[1][10]=exo[0][10].replace(/'/g,"’");

conseil[10]=0;

  titre[0][11]="Y et H (annulaires)";
  titre[1][11]=titre[0][11];
lettres[0][11]="yhYH";
lettres[1][11]=lettres[0][11];
    exo[0][11]="J'espère hypnotiser les sénateurs avec les chrysanthèmes disséminés dans l'hémicycle.###Les polytechniciens aussi ont besoin de s'hydrater.###C'est avec du rythme que le saxophoniste et le psychiatre joueur de synthé pourront se synchroniser.###Un asthmatique en crise présente une inspiration maximale qui abaisse le diaphragme, repousse les abdominaux et remplit le thorax.###Je suis chez ce cher Serge, cherchant des chers cierges, assis sur des chers sièges.###Le chiche, son chicha et son chien sont souvent chez Sanson ou chez Charles sans se soucier de sa sécheuse sèche.";
    exo[1][11]=exo[0][11].replace(/'/g,"’");

conseil[11]=4;

  titre[0][12]="À et F (auriculaires)";
  titre[1][12]=titre[0][12];
lettres[0][12]="àfÀF";
lettres[1][12]=lettres[0][12];
    exo[0][12]="Riri, Fifi et Loulou.###Pif, paf, pouf.###Et voilà, on a fait le tour de toutes les touches.###Le bépo, c'est facile, finalement.###À partir de maintenant, il suffira de faire quelques derniers petits efforts.";
    exo[1][12]=exo[0][12].replace(/'/g,"’");
conseil[12]=0;

  titre[0][13]="Accents morts ^ et ¨ (Ê, Î, Û, Â, Ô, Ï, Ä)";
  titre[1][13]=titre[0][13];
lettres[0][13]="^¨êÊ";
lettres[1][13]=lettres[0][13];
    exo[0][13]="Être ou ne pas être.###Il paraît qu'un bon feu dans l'âtre contribue à être bien.###Il est sûr et certain.###La brebis a dû paître à côté.###La laïcité peut être ambiguë.###Le canoë est emporté dans un maelström.###C'est la belle nuit de Noël.###Ma trisaïeule hébraïque raffole de l'aïoli.###Les paranoïaques poussent des cris suraigüs.";
    exo[1][13]=exo[0][13].replace(/'/g,"’");

conseil[13]=5;

titre[0][14]="Touches en AltGr (Ù, Œ, Æ)";
titre[1][14]=titre[0][14];
lettres[0][14]="ùœæÙŒÆ";
lettres[1][14]=lettres[0][14];
conseil[14]=0;
exo[0][14]="Où que soit cet œuf.###Qui vole un œuf, vole un bœuf.###Curriculum Vitæ.###Et cætera.###Lætitia et Éric sont arrivés ex æquo.###Où qu'il soit, il y est.###Je ne sais où ni quand.";
exo[1][14]=exo[0][14].replace(/'/g,"’");

titre[0][15]="Tiret et point d’interrogation (avec espace fine insécable)";
titre[1][15]=titre[0][15];
lettres[0][15]="-?"
lettres[1][15]=lettres[0][15];
conseil[15]=6;
//exo[0][15]="Les chaussettes de l'archi-duchesse sont-elles sèches, archi-sèches ?###Où est-il ?###Que se passe-t-il ?###Qu'est-il arrivé ?###Qu'y a-t-il ?###Peut-être est-il trop tard.";
exo[0][15]="Les chaussettes de l'archi-duchesse sont-elles sèches, archi-sèches ?###Où est-il ?###Que se passe-t-il ?###Qu'est-il arrivé ?###Qu'y a-t-il ?###Peut-être est-il trop tard.";
exo[1][15]=exo[0][15].replace(/'/g,"’");

titre[0][16]="Ponctuation double (; : !) et espace insécable";
titre[1][16]=titre[0][16];
lettres[0][16]=";:!";
lettres[1][16]=lettres[0][16];
conseil[16]=6;
//exo[0][16]="Et revoilà la sous-préfète !###La voilà ; elle arrive !";
exo[0][16]="Et revoilà la sous-préfète !###La voilà ; elle arrive !";
exo[1][16]=exo[0][16].replace(/'/g,"’");

titre[0][17]="Parenthèses";
titre[1][17]=titre[0][17];
lettres[0][17]="()";
lettres[1][17]=lettres[0][17];
conseil[17]=0;
exo[0][17]="World Wide Web (www)";
exo[1][17]=exo[0][17].replace(/'/g,"’");

titre[0][18]="Guillemets";
titre[1][18]=titre[0][18];
lettres[0][18]="«»";
lettres[1][18]=lettres[0][18];
conseil[18]=7;
//exo[0][18]="la Haute Autorité pour la Diffusion des Œuvres et la Protection des Droits sur Internet ou « HADOPI »";
exo[0][18]="la Haute Autorité pour la Diffusion des Œuvres et la Protection des Droits sur Internet ou « HADOPI »";
exo[1][18]=exo[0][18].replace(/'/g,"’");

titre[0][19]="Pangrammes";
titre[1][19]=titre[0][19];
lettres[0][19]="";
lettres[1][19]=lettres[0][19];
conseil[19]=8;
//exo[0][19]="Vif PDG mentor, exhibez la squaw jockey.###Juge, flambez l'exquis patchwork d'Yvon.###Vif juge, trempez ce blond whisky aqueux.###Fripon, mixez l'abject whisky qui vidange.###Buvez de ce whisky que le patron juge fameux.###Portez ce vieux whisky au juge blond qui fume.###Jugez qu'un vieux whisky blond pur malt fonce.###Faux kwachas ? Quel projet de voyage zambien !###Fougueux, j'enivre la squaw au pack de beau zythum.###Ketch, yawl, jonque flambant neuve… jugez des prix !###Vieux pelage que je modifie : breitschwanz ou yak ?###Prouvez, beau juge, que le fameux sandwich au yak tue.###Voyez ce jeu exquis wallon, de graphie en kit mais bref.";
exo[0][19]="Vif PDG mentor, exhibez la squaw jockey.###Juge, flambez l'exquis patchwork d'Yvon.###Vif juge, trempez ce blond whisky aqueux.###Fripon, mixez l'abject whisky qui vidange.###Buvez de ce whisky que le patron juge fameux.###Portez ce vieux whisky au juge blond qui fume.###Jugez qu'un vieux whisky blond pur malt fonce.###Faux kwachas ? Quel projet de voyage zambien !###Fougueux, j'enivre la squaw au pack de beau zythum.###Ketch, yawl, jonque flambant neuve… jugez des prix !###Vieux pelage que je modifie : breitschwanz ou yak ?###Prouvez, beau juge, que le fameux sandwich au yak tue.###Voyez ce jeu exquis wallon, de graphie en kit mais bref.";
exo[1][19]=exo[0][19].replace(/'/g,"’");

titre[0][20]="Pangrammes accentués";
titre[1][20]=titre[0][20];
lettres[0][20]="";
lettres[1][20]=lettres[0][20];
conseil[20]=0;
//exo[0][20]="Perchez dix, vingt woks. Qu'y flambé-je ?###Le moujik équipé de faux breitschwanz voyage.###Kiwi fade, aptéryx, quel jambon vous gâchez !###Voyez le brick géant que j'examine près du wharf.###Bâchez la queue du wagon-taxi avec les pyjamas du fakir.###Mon pauvre zébu ankylosé choque deux fois ton wagon jaune.###Voix ambiguë d'un cœur qui, au zéphyr, préfère les jattes de kiwis.";
exo[0][20]="Perchez dix, vingt woks. Qu'y flambé-je ?###Le moujik équipé de faux breitschwanz voyage.###Kiwi fade, aptéryx, quel jambon vous gâchez !###Voyez le brick géant que j'examine près du wharf.###Bâchez la queue du wagon-taxi avec les pyjamas du fakir.###Mon pauvre zébu ankylosé choque deux fois ton wagon jaune.###Voix ambiguë d'un cœur qui, au zéphyr, préfère les jattes de kiwis.";
exo[1][20]=exo[0][20].replace(/'/g,"’");
